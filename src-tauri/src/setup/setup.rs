use crate::commands::storecommands;
use crate::store::configstore;
use crate::window::windowsetup;
use anyhow::Result;
use std::error::Error;
use tauri::path::BaseDirectory;
use tauri::App;
use tauri::Manager;

pub fn setup(app: &mut App) -> Result<(), Box<dyn Error>> {
    let window = app.get_webview_window("main").unwrap();
    let _ = windowsetup::window_config(&window);
    let _ = configstore::set_up_config_store(app.app_handle().clone());

    let base_path = app.path().resolve(".cyphers/", BaseDirectory::AppData);
    println!("{:?}", base_path.unwrap().exists());

    Ok(())
}
