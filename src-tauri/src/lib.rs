// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use tauri::{
    menu::{MenuBuilder, MenuItemBuilder, SubmenuBuilder},
    Emitter, Manager, Wry,
};
use tauri_plugin_dialog::{DialogExt, FileDialogBuilder};

#[derive(Deserialize)]
pub struct HttpOkRequest {
    pub method: String,
    pub url: String,
    pub headers: Option<HashMap<String, String>>,
    pub body: Option<String>,
}

#[derive(Serialize)]
pub struct HttpOkFullResponse {
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
    let mut req = client.request(method, &request.url);

    if let Some(headers) = request.headers {
        for (k, v) in headers {
            req = req.header(k, v);
        }
    }

    if let Some(body) = request.body {
        req = req.body(body);
    }

    let res = req.send().await.map_err(|e| e.to_string())?;

    let status = res.status().as_u16();
    let status_text = res.status().canonical_reason().unwrap_or("").to_string();
    let url = res.url().to_string();
    let ok = res.status().is_success();
    let headers = res
        .headers()
        .iter()
        .map(|(k, v)| (k.to_string(), v.to_str().unwrap_or("").to_string()))
        .collect();

    let body = res.text().await.map_err(|e| e.to_string())?;

    Ok(HttpOkFullResponse {
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
            let save_item = MenuItemBuilder::new("Save")
                .id("save")
                .accelerator("CmdOrCtrl+S")
                .build(app)?;

            let open_item = MenuItemBuilder::new("Open")
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
