use anyhow::Result;
use tauri::{LogicalSize, WebviewWindow};

pub(crate) fn window_config(window: &WebviewWindow) -> Result<()> {
    window.open_devtools();
    window.close_devtools();
    window
        .set_title("Cypher - Knowledge Management for all.")
        .unwrap();

    let start_size = LogicalSize::new(1200, 800);
    window.set_size(start_size).unwrap();
    let _ = window.set_always_on_bottom(true).unwrap();
    window.set_min_size(Some(start_size)).unwrap();
    Ok(())
}
