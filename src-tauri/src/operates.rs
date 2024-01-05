use tauri::{App, AppHandle, Manager, Runtime, Window};

use crate::{library, repos};

/// 提供给前端的创建新项目的接口
#[tauri::command]
pub fn create_new_project<R: Runtime>(
    app: AppHandle<R>,
    window: Window<R>,
    target_path: String,
    name: String,
    author: Option<String>,
    email: Option<String>,
    description: Option<String>,
) -> anyhow::Result<()> {
    library::new(target_path, &name, author, email, description)?;
    app.emit_all("project_loaded", name);
    Ok(())
}

/// 提供给前端的加载项目的接口
#[tauri::command]
pub fn load_project<R: Runtime>(
    app: AppHandle<R>,
    window: Window<R>,
    target_path: String,
) -> anyhow::Result<()> {
    library::open(target_path)?;
    let meta = repos::query_meta()?;
    app.emit_all("project_loaded", meta.name);
    Ok(())
}
