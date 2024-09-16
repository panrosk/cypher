use tauri::{App, Listener, Manager};
use crate::events::files::set_current_file;
macro_rules! setup_event_listeners {
    ($app:expr, $app_handle:expr, $(($event_name:expr, $handler:expr)),* $(,)?) => {
        {
            let mut ids = Vec::new();
            $(
                let app_handle_clone = $app_handle.clone();
                let id = $app.listen($event_name, move |event| $handler(event, app_handle_clone.clone()));
                ids.push(id);
            )*
            ids
        }
    };
}

pub fn config_all_events(app: &mut App) -> Vec<u32> {
    let app_handle = app.app_handle().clone();
    setup_event_listeners!(
        app,
        app_handle,
        ("set_current_file", |event, app_handle| set_current_file(
            event, app_handle
        ))
    )
}
