use rust_decimal::Decimal;
use serde::{Deserialize, Serialize};
use tauri::{AppHandle, Manager, Runtime};

use crate::{
    entities,
    errors::{self, Result},
    library, repos,
};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ProjectLoadedEventPayload {
    pub name: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct PhaseStatistics {
    pub total: usize,
    pub persists: usize,
    pub drafts: usize,
    pub min_length: usize,
    pub max_length: usize,
    pub average_length: Decimal,
    pub total_length: usize,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ProjectMeta {
    pub meta: entities::Meta,
    pub stat: PhaseStatistics,
}

/// 提供给前端的创建新项目的接口
#[tauri::command]
pub fn create_new_library<R: Runtime>(
    app: AppHandle<R>,
    target_path: String,
    name: String,
    author: Option<String>,
    email: Option<String>,
    description: Option<String>,
) -> Result<()> {
    library::new(
        target_path,
        &name,
        author.as_deref(),
        email.as_deref(),
        description.as_deref(),
    )?;
    app.emit("library_loaded", ProjectLoadedEventPayload { name })
        .map_err(|e| errors::LibraryError::TauriRuntimeError(e))?;
    Ok(())
}

/// 提供给前端的加载项目的接口
#[tauri::command]
pub fn load_library<R: Runtime>(app: AppHandle<R>, target_path: String) -> Result<()> {
    library::open(target_path)?;
    let package_instance = library::acquire_package();
    let package = package_instance.read().unwrap();
    app.emit(
        "library_loaded",
        ProjectLoadedEventPayload {
            name: package.meta.name.clone(),
        },
    )
    .map_err(|e| errors::LibraryError::TauriRuntimeError(e))?;
    Ok(())
}

/// 提供给前端的获取项目源数据以及词汇统计数据的接口
#[tauri::command]
pub fn library_glance() -> Result<ProjectMeta> {
    let meta = {
        let package = library::acquire_package();
        let ld_package = package.read().unwrap();
        ld_package.meta.clone()
    };
    let stat = PhaseStatistics {
        total: repos::stat::total_phases(),
        persists: repos::stat::total_persist_phases(),
        drafts: repos::stat::total_draft_phases(),
        min_length: repos::stat::min_phase_length(),
        max_length: repos::stat::max_phase_length(),
        average_length: repos::stat::average_phase_length(),
        total_length: repos::stat::total_phase_length(),
    };
    Ok(ProjectMeta { meta, stat })
}

#[tauri::command]
pub fn modify_library_meta<R: Runtime>(
    app: AppHandle<R>,
    target_property: String,
    new_value: String,
) -> Result<()> {
    let package = library::acquire_package();
    let mut ld_package = package.write().unwrap();
    match target_property.as_str() {
        "name" => ld_package.meta.name = new_value,
        "author" => ld_package.meta.author = Some(new_value),
        "email" => ld_package.meta.email = Some(new_value),
        "description" => ld_package.meta.description = Some(new_value),
        _ => {
            return Err(errors::LibraryError::InvalidProjectMetaProperty(
                target_property,
            ))
        }
    }
    ld_package.meta.update_modified_time();
    library::save_library(&ld_package)?;
    app.emit(
        "library_modified",
        ProjectLoadedEventPayload {
            name: ld_package.meta.name.clone(),
        },
    )
    .map_err(|e| errors::LibraryError::TauriRuntimeError(e))?;
    Ok(())
}
