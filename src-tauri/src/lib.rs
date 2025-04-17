// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

use serde::{Deserialize, Serialize};
use std::collections::HashMap;

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

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, fetch_with_full_response])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
