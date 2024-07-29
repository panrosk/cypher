use crate::files::file_types::File;
use anyhow::Result;
use tauri::ipc::InvokeError;

use crate::{files::file_handling::get_files_list, store::configstore::set_values_config_store};

#[tauri::command]
pub fn set_dir(app_handle: tauri::AppHandle, dir: &str) -> Result<(), InvokeError> {
    let _ = set_values_config_store(app_handle.clone(), "current_notes_directory", dir.into());
    let dir_files = get_files_list(dir).unwrap();
    let _ = set_values_config_store(
        app_handle.clone(),
        "current_files_on_directory",
        serde_json::to_value(dir_files).unwrap(),
    );
    Ok(())
}
