// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
mod commands;
mod files;
mod setup;
mod store;
mod window;
use commands::filescommands::{get_dir_files, read_file};
use commands::storecommands::set_dir;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .setup(|app| setup::setup::setup(app))
        .invoke_handler(tauri::generate_handler![set_dir, get_dir_files, read_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
