use crate::{files::file::File, store::appstore::set_values_config_store};
use serde::{Deserialize, Serialize};
use tauri::{AppHandle, Event};

#[derive(Serialize, Deserialize, Debug)]
struct SetCurrentFile {
    file: File,
}

pub fn set_current_file(event: Event, app_handle: AppHandle) {
    let payload = event.payload();
    match serde_json::from_str::<SetCurrentFile>(payload) {
        Ok(current_file) => {
            log::info!("set_dir event triggered {:?}", current_file.file);
            set_values_config_store(
                app_handle.clone(),
                "current_file",
                serde_json::to_value(current_file.file).unwrap(),
            )
        }
        Err(err) => {
            eprintln!("Error deserializing event: {}", err);
        }
    }
}
