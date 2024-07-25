use anyhow::Result;
use tauri::ipc::InvokeError;

use crate::{
    files::{self, file_types},
    store::configstore::set_values_config_store,
};
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
pub fn set_dir(app_handle: tauri::AppHandle, dir: &str) -> Result<(), InvokeError> {
    let _ = set_values_config_store(app_handle, "current_notes_directory", dir.into());
    Ok(())
}

#[tauri::command]
pub fn get_dir_files(dir: &str) -> Result<Vec<Option<file_types::File>>, InvokeError> {
    let dir_files = files::file_handling::get_files_list(dir).unwrap();
    Ok(dir_files)
}
