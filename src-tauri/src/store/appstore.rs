use crate::files::file::File;
use crate::store::stores::StoreType;
use serde::{Deserialize, Serialize};
use std::path::PathBuf;
use tauri::{Manager, Wry};
use tauri_plugin_store::{with_store, StoreCollection};

use serde_json::{json, Value};

#[derive(Debug, Serialize, Deserialize, Clone)]
struct AppState {
    current_notes_directory: Option<String>,
    current_files_on_directory: Vec<Option<File>>,
    current_file: Option<File>,
    crypts: Vec<String>,
}

pub fn set_up_config_store(app: tauri::AppHandle) {
    let stores = app.state::<StoreCollection<Wry>>();
    let path = PathBuf::from("store.bin");

    let config_store = AppState {
        current_notes_directory: None,
        current_files_on_directory: vec![None],
        current_file: None,
        crypts: Vec::new(),
    };

    let _ = with_store(app.clone(), stores, path, |store| {
        store.insert(StoreType::AppState.to_string(), json!(config_store))?;
        store.save()?;

        Ok(())
    });

    log::info!("Appstore configured")
}

pub fn set_values_config_store(app: tauri::AppHandle, key: &str, value: Value) {
    let stores = app.state::<StoreCollection<Wry>>();
    let path = PathBuf::from("store.bin");
    let _ = with_store(app.clone(), stores, path, |store| {
        let current_store: &Value = store
            .get(StoreType::AppState.to_string())
            .expect("current store not found");
        let mut config_store: AppState = serde_json::from_value(current_store.clone()).unwrap();

        match key {
            "current_notes_directory" => {
                if let Some(directory) = value.as_str() {
                    config_store.current_notes_directory = Some(directory.to_string());
                    if config_store.crypts.iter().all(|x| x != key) {
                        config_store.crypts.push(key.to_string());
                    };
                }
            }
            "current_files_on_directory" => {
                if let Ok(files) = serde_json::from_value::<Vec<Option<File>>>(value) {
                    config_store.current_files_on_directory = files;
                }
            }
            "current_file" => {
                if let Ok(file) = serde_json::from_value::<Option<File>>(value) {
                    config_store.current_file = file;
                }
            }
            _ => {}
        }

        store.insert(
            StoreType::AppState.to_string(),
            serde_json::to_value(config_store)?,
        )?;
        store.save()?;

        Ok(())
    });
}
