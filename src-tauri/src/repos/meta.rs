use crate::{entities::Meta, errors};

/// 从项目文件中查询元数据信息
pub fn query_meta() -> anyhow::Result<Meta> {
    let library = crate::library::access();
    if library.is_available() == false {
        return Err(errors::DatabaseFileError::InvalidProjectFile.into());
    }
    let meta = library
        .as_ref()
        .query_row("SELECT * FROM meta LIMIT 1", [], |row| Meta::try_from(row))?;
    Ok(meta)
}
