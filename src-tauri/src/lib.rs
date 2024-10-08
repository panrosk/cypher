mod commands;
mod events;
mod files;
mod setup;
mod store;

use commands::files::{save_files, set_current_dir};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .setup(|app| setup::setup::setup(app))
        .invoke_handler(tauri::generate_handler![set_current_dir, save_files])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
