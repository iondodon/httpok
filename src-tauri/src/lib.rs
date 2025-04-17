// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

use serde::Serialize;
use std::collections::HashMap;

#[derive(Serialize)]
pub struct ResponseData {
    status: u16,
    status_text: String,
    url: String,
    ok: bool,
    headers: HashMap<String, String>,
    body: String,
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn fetch_with_full_response(
    method: String,
    url: String,
    headers: Option<HashMap<String, String>>,
    body: Option<String>,
) -> Result<ResponseData, String> {
    let client = reqwest::blocking::Client::new();
    let mut req = client.request(method.parse().unwrap_or(reqwest::Method::GET), &url);

    if let Some(headers) = headers {
        for (k, v) in headers {
            req = req.header(k, v);
        }
    }

    println!("Request: {:?}", req);

    if let Some(body) = body {
        println!("Body: {}", body);
        req = req.body(body);
    }

    let res = req.send().map_err(|e| e.to_string())?;

    let status = res.status().as_u16();
    let status_text = res.status().canonical_reason().unwrap_or("").to_string();
    let url = res.url().to_string();
    let ok = res.status().is_success();
    let headers = res
        .headers()
        .iter()
        .map(|(k, v)| (k.to_string(), v.to_str().unwrap_or("").to_string()))
        .collect();

    let body = res.text().map_err(|e| e.to_string())?;

    Ok(ResponseData {
        status,
        status_text,
        url,
        ok,
        headers,
        body,
    })
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, fetch_with_full_response])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
