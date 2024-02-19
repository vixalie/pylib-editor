use std::io;

use thiserror::Error;

/// 主要代表用户词库文件操作时出现的错误。
#[derive(Debug, Error)]
pub enum LibraryError {
    #[error("词库项目文件没有打开或者无法读写")]
    InvalidFile,
    #[error("词库项目文件已经存在")]
    FileExists,
    #[error("词库项目文件不存在")]
    FileUnexists,
    #[error("词库项目文件所使用路径创建失败")]
    PathCreateFailed(io::Error),
    #[error("词库项目文件创建失败")]
    CreateFailed(io::Error),
    #[error("词库项目文件打开失败")]
    OpenFailed(io::Error),
    #[error("词库项目文件不是合法的项目文件")]
    InvalidProjectFile,
    #[error("词库文件读取错误")]
    ReadFailed(io::Error),
    #[error("词库文件写入错误")]
    WriteFailed(io::Error),
    #[error("词库文件内容序列化失败")]
    SerializeFailed(bincode::Error),
    #[error("词库文件内容反序列化失败，可能是文件内容损坏或者不是合法的词库项目文件")]
    DeserializeFailed(bincode::Error),
    #[error("词库项目文件版本错误，需要 {required}，但是找到 {found}")]
    IncorrectVersion { required: u32, found: u32 },
    #[error("词库查询错误")]
    QueryError,
    #[error("词库元信息属性不正确，指定操作属性：{0}")]
    InvalidProjectMetaProperty(String),
    #[error("Tauri运行时错误")]
    TauriRuntimeError(tauri::Error),
    #[error("意料之外的错误")]
    Unpredictable,
}

impl serde::Serialize for LibraryError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::ser::Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}
