use anyhow::Result;
use tauri::App;
use tauri_plugin_fs::FsExt;

fn setup_files(app: App) -> Result<()> {
    let scope = app.fs_scope();
    Ok(())
}
