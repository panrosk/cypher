use super::window;
use crate::setup::events::config_all_events;
use crate::store::appstore;
use anyhow::Result;
use std::error::Error;
use tauri::App;
use tauri::Manager;

pub fn setup(app: &mut App) -> Result<(), Box<dyn Error>> {
    let window = app.get_webview_window("main").unwrap();
    let _ = window::window_config(&window);
    let _ = appstore::set_up_config_store(app.app_handle().clone());
    let _ids = config_all_events(app);
    Ok(())
}
