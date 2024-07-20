use anyhow::Error;
use serde::{Deserialize, Serialize};
use std::path::PathBuf;
use tauri::{Manager, Wry};
use tauri_plugin_store::{with_store, StoreCollection};

use serde_json::json;
#[derive(Debug, Serialize, Deserialize)]
struct ConfigStore {
    notes_directory: String,
}

pub fn set_up_config_store(app: tauri::AppHandle) -> Result<(), Error> {
    let stores = app.state::<StoreCollection<Wry>>();
    let path = PathBuf::from("store.bin");

    let config_store = ConfigStore {
        notes_directory: "/".to_string(),
    };

    let _ = with_store(app.clone(), stores, path, |store| {
        // Note that values must be serde_json::Value instances,
        // otherwise, they will not be compatible with the JavaScript bindings.
        store.insert("configStore".to_string(), json!(config_store))?;

        // Get a value from the store.

        // You can manually save the store after making changes.
        // Otherwise, it will save upon graceful exit as described above.
        store.save()?;

        Ok(())
    });
    Ok(())
}
