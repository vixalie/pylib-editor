use thiserror::Error;

/// 主要代表用户词库文件操作时出现的错误。
#[derive(Debug, Error)]
pub enum DatabaseFileError {
    #[error("词库项目文件已经存在")]
    FileExists,
    #[error("词库项目文件不存在")]
    FileUnexists,
    #[error("词库项目文件创建失败")]
    CreateFailed(#[from] rusqlite::Error),
    #[error("词库项目文件打开失败")]
    OpenFailed(#[from] rusqlite::Error),
    #[error("词库项目文件不是合法的项目文件")]
    InvalidProjectFile,
    #[error("词库项目文件初始化失败")]
    InitializationFailed(#[from] rusqlite::Error),
    #[error("词库项目文件版本错误，需要 {required}，但是找到 {found}")]
    IncorrectVersion { required: u32, found: u32 },
    #[error("词库查询错误")]
    QueryError(#[from] rusqlite::Error),
    #[error("意料之外的错误")]
    Unpredictable,
}
