use serde::{Deserialize, Serialize};
use tauri::{App, AppHandle, Manager, Runtime, Window};

use crate::{library, repos};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ProjectLoadedEventPayload {
    pub name: String,
}

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
) -> Result<(), String> {
    library::new(target_path, &name, author, email, description).map_err(|e| e.to_string())?;
    app.emit_all("project_loaded", ProjectLoadedEventPayload { name })
        .map_err(|e| e.to_string())?;
    Ok(())
}

/// 提供给前端的加载项目的接口
#[tauri::command]
pub fn load_project<R: Runtime>(
    app: AppHandle<R>,
    window: Window<R>,
    target_path: String,
) -> Result<(), String> {
    library::open(target_path).map_err(|e| e.to_string())?;
    let meta = repos::query_meta().map_err(|e| e.to_string())?;
    app.emit_all(
        "project_loaded",
        ProjectLoadedEventPayload { name: meta.name },
    )
    .map_err(|e| e.to_string())?;
    Ok(())
}
