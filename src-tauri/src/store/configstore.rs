use crate::store::stores::StoreType;
use anyhow::{Error, Result};
use serde::{Deserialize, Serialize};
use std::path::PathBuf;
use tauri::{Manager, Wry};
use tauri_plugin_store::{with_store, StoreCollection};

use serde_json::{json, Value};

#[derive(Debug, Serialize, Deserialize, Clone)]
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
        store.insert(StoreType::ConfigStore.to_string(), json!(config_store))?;
        store.save()?;

        Ok(())
    });
    Ok(())
}

pub fn set_values_config_store(
    app: tauri::AppHandle,
    key: &str,
    value: Value,
) -> Result<(), Error> {
    let stores = app.state::<StoreCollection<Wry>>();
    let path = PathBuf::from("store.bin");
    let _ = with_store(app.clone(), stores, path, |store| {
        let current_store: &Value = store.get(StoreType::ConfigStore.to_string()).unwrap();
        let mut config_store: ConfigStore = serde_json::from_value(current_store.clone()).unwrap();

        match key {
            "current_notes_directory" => config_store.current_notes_directory = value.to_string(),
            _ => {}
        }

        if config_store.crypts.iter().all(|x| x != key) {
            config_store.crypts.push(key.to_string());
        };

        store.insert(
            StoreType::ConfigStore.to_string(),
            serde_json::to_value(config_store)?,
        )?;
        store.save()?;

        Ok(())
    })?;

    Ok(())
}
