use tauri::{Builder, Runtime};

mod project;

pub fn register_operates<R: Runtime>(builder: Builder<R>) -> Builder<R> {
    builder.invoke_handler(tauri::generate_handler![
        project::create_new_library,
        project::load_library,
        project::library_glance,
        project::modify_library_meta
    ])
}
