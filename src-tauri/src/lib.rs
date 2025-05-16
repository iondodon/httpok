// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

use reqwest::multipart::{Form, Part};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::path::Path;
use tauri::{
    menu::{MenuBuilder, MenuItemBuilder, SubmenuBuilder},
    Emitter, Manager, Wry,
};
use tauri_plugin_dialog::{DialogExt, FileDialogBuilder};
use tokio::fs::File;
use tokio::io::AsyncReadExt;

#[derive(Deserialize)]
pub struct HttpOkRequest {
    pub method: String,
    pub url: String,
    pub headers: Option<HashMap<String, String>>,
    pub body: Option<String>,
    pub is_multipart: Option<bool>,
}

#[derive(Serialize)]
pub struct HttpOkFullResponse {
    #[serde(rename = "durationMiliseconds")]
    pub duration_miliseconds: f64,
    pub status: u16,

    #[serde(rename = "statusText")]
    pub status_text: String,

    pub url: String,
    pub ok: bool,
    pub headers: HashMap<String, String>,
    pub body: String,
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn fetch_with_full_response(request: HttpOkRequest) -> Result<HttpOkFullResponse, String> {
    let client = reqwest::Client::new();
    let method = request.method.parse().unwrap_or(reqwest::Method::GET);

    // Create request builder with a fixed timeout of 30 seconds
    let mut req = client.request(method, &request.url);

    // Fixed timeout of 30 seconds for all requests
    const TIMEOUT_DURATION: std::time::Duration = std::time::Duration::from_secs(30);
    req = req.timeout(TIMEOUT_DURATION);

    if let Some(headers) = request.headers {
        for (k, v) in headers {
            if k.to_lowercase() != "content-type" || !request.is_multipart.unwrap_or(false) {
                req = req.header(k, v);
            }
        }
    }

    if let Some(body) = request.body {
        if request.is_multipart.unwrap_or(false) {
            let mut form = Form::new();
            println!("file upload: {}", body);

            // Parse the body for file uploads
            for line in body.lines() {
                if let Some((key, value)) = line.split_once('=') {
                    if value.starts_with("@") {
                        // This is a file upload
                        let file_path = &value[1..]; // Remove the @ prefix
                        let path = Path::new(file_path);

                        if !path.exists() {
                            return Err(format!("File not found: {}", file_path));
                        }

                        let mut file = File::open(path).await.map_err(|e| e.to_string())?;
                        let mut contents = Vec::new();
                        file.read_to_end(&mut contents)
                            .await
                            .map_err(|e| e.to_string())?;

                        let file_name = path.file_name().and_then(|n| n.to_str()).unwrap_or("file");

                        let part = Part::bytes(contents).file_name(file_name.to_string());

                        form = form.part(key.trim().to_string(), part);
                    } else {
                        // This is a regular field
                        form = form.text(key.trim().to_string(), value.trim().to_string());
                    }
                }
            }
            req = req.multipart(form);
        } else {
            println!("body: {}", body);
            req = req.body(body);
        }
    }

    let start = std::time::Instant::now();
    let res = match req.send().await {
        Ok(response) => response,
        Err(e) => {
            if e.is_timeout() {
                return Err(format!(
                    "Request timed out after {} seconds",
                    TIMEOUT_DURATION.as_secs()
                ));
            }
            return Err(e.to_string());
        }
    };
    let duration_miliseconds = start.elapsed().as_secs_f64() * 1000.0;

    let status = res.status().as_u16();
    let status_text = res.status().canonical_reason().unwrap_or("").to_string();
    let url = res.url().to_string();
    let ok = res.status().is_success();
    let headers = res
        .headers()
        .iter()
        .map(|(k, v)| (k.to_string(), v.to_str().unwrap_or("").to_string()))
        .collect();

    let body = match tokio::time::timeout(TIMEOUT_DURATION, res.text()).await {
        Ok(body_result) => body_result.map_err(|e| e.to_string())?,
        Err(_) => {
            return Err(format!(
                "Response body read timed out after {} seconds",
                TIMEOUT_DURATION.as_secs()
            ))
        }
    };

    Ok(HttpOkFullResponse {
        duration_miliseconds,
        status,
        status_text,
        url,
        ok,
        headers,
        body,
    })
}

#[tauri::command]
async fn save_with_dialog(content: String, app: tauri::AppHandle<Wry>) -> Result<(), String> {
    let file_dialog: FileDialogBuilder<Wry> = app.dialog().file();

    let file_path = tauri::async_runtime::spawn_blocking(move || {
        file_dialog
            .set_title("Save .httpok file")
            .add_filter("HttpOk", &["httpok"])
            .blocking_save_file()
    })
    .await
    .map_err(|e| e.to_string())?;

    if let Some(path) = file_path.and_then(|f| f.as_path().map(|p| p.to_path_buf())) {
        std::fs::write(path, content).map_err(|e| e.to_string())?;
    }

    Ok(())
}

async fn open_and_read_file(app: tauri::AppHandle<Wry>) -> Result<(), String> {
    let file_dialog: FileDialogBuilder<Wry> = app.dialog().file();

    let file_path = tauri::async_runtime::spawn_blocking(move || {
        file_dialog
            .set_title("Open .httpok file")
            .add_filter("HttpOk", &["httpok"])
            .blocking_pick_file()
    })
    .await
    .map_err(|e| e.to_string())?;

    if let Some(path) = file_path.and_then(|f| f.as_path().map(|p| p.to_path_buf())) {
        let content = std::fs::read_to_string(path).map_err(|e| e.to_string())?;

        // Send file content to frontend
        if let Some(window) = app.get_webview_window("main") {
            window.emit("file-opened", content).unwrap();
        }
    }

    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .setup(|app| {
            // Create the "Save" menu item
            let save_item = MenuItemBuilder::new("Save .httpok file")
                .id("save")
                .accelerator("CmdOrCtrl+S")
                .build(app)?;

            let open_item = MenuItemBuilder::new("Open .httpok file")
                .id("open")
                .accelerator("CmdOrCtrl+O")
                .build(app)?;

            // Create the "File" submenu and add the "Save" item
            let file_menu = SubmenuBuilder::new(app, "File")
                .items(&[&open_item, &save_item])
                .build()?;

            // Build the main menu and add the "File" submenu
            let menu = MenuBuilder::new(app).items(&[&file_menu]).build()?;

            // Set the menu for the application
            app.set_menu(menu)?;

            // Listen for menu events
            app.on_menu_event(move |app_handle, event| {
                if event.id() == "save" {
                    if let Some(window) = app_handle.get_webview_window("main") {
                        let _ = window.emit("menu-save", ());
                    }
                }
                if event.id() == "open" {
                    let app = app_handle.clone();
                    tauri::async_runtime::spawn(async move {
                        if let Err(e) = open_and_read_file(app).await {
                            eprintln!("Open failed: {e}");
                        }
                    });
                }
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            greet,
            fetch_with_full_response,
            save_with_dialog
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
