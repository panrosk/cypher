use crate::files::file_types::File;
use anyhow::Result;
use serde_json::Value;
use tauri::ipc::InvokeError;

use crate::files::file_handling::get_files_list;

#[tauri::command]
pub fn get_dir_files(dir: &str) -> Result<Vec<Option<File>>, InvokeError> {
    let dir_files = get_files_list(dir).unwrap();
    Ok(dir_files)
}

#[tauri::command]
pub fn read_file(file: Value) -> Result<Value, InvokeError> {
    let file_to_read: File = serde_json::from_value(file).unwrap();
    let markdown = file_to_read.read_files();
    Ok(markdown)
}
