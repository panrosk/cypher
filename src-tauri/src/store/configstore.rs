use anyhow::Error;
use serde::{Deserialize, Serialize};
use std::path::PathBuf;
use tauri::{Manager, Wry};
use tauri_plugin_store::{with_store, StoreCollection};

use serde_json::json;
#[derive(Debug, Serialize, Deserialize)]
struct ConfigStore {
    current_notes_directory: String,
    theme: String,
    crypts: Vec<String>,
    app_dir: String,
}

pub fn set_up_config_store(app: tauri::AppHandle) -> Result<(), Error> {
    let stores = app.state::<StoreCollection<Wry>>();
    let path = PathBuf::from("store.bin");

    let config_store = ConfigStore {
        current_notes_directory: "/".to_string(),
        theme: "/theme/theme.css".to_string(),
        crypts: Vec::new(),
        app_dir: "".to_string(),
    };

    let _ = with_store(app.clone(), stores, path, |store| {
        store.insert("configStore".to_string(), json!(config_store))?;
        store.save()?;

        Ok(())
    });
    Ok(())
}
