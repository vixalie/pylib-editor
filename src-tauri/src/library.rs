use std::{
    fs::File,
    os,
    path::Path,
    sync::{Mutex, MutexGuard},
};

use rusqlite::Connection;

use crate::errors;

#[derive(Debug)]
pub struct Library {
    pub connection: Connection,
}

static WORKING_LIBRARY: Mutex<Library> = Mutex::new(Library {
    connection: Connection::open_in_memory().unwrap(),
});

const CURRENT_VERSION: u32 = 1;
const CREATE_META_TABLE_SQL: &str = "CREATE TABLE meta IF NOT EXISTS (\
    created_at INTEGER NOT NULL PRIMARY KEY ON CONFLICT FAIL, \
    name TEXT NOT NULL, \
    author TEXT, \
    email TEXT, \
    description TEXT, \
    version INTEGER NOT NULL, \
)";
const CREATE_PHASE_TABLE_SQL: &str = "CREATE TABLE phase IF NOT EXISTS (\
    id INTEGER NOT NULL PRIMARY KEY ON CONFLICT FAIL AUTOINCREMENT, \
    phase TEXT NOT NULL UNIQUE ON CONFLICT FAIL, \
    pinyin TEXT NOT NULL, \
    abbr TEXT NOT NULL, \
    weight INTEGER NOT NULL DEFAULT 5, \
    draft INTEGER NOT NULL DEFAULT 1, \
    created_at INTEGER NOT NULL, \
    modified_at INTEGER NOT NULL, \
)";
const CHECK_LIBRARY_TABLE_EXISTS_SQL: &str = "SELECT count(*) FROM sqlite_master \
    WHERE type='table' AND name=:table_name";

/// 锁定当前词库项目，获取一个可以使用和变更的实例锁。
pub fn access() -> MutexGuard<'static, Library> {
    WORKING_LIBRARY.lock().unwrap()
}

/// 创建一个新的词库项目。
pub fn new<P: AsRef<Path>>(
    path: P,
    name: &str,
    author: Option<String>,
    email: Option<String>,
    description: Option<String>,
) -> anyhow::Result<()> {
    let target_path = path.as_ref();
    let library_file_path = target_path.join(name + ".pylib");
    if library_file_path.exists() {
        return Err(errors::DatabaseFileError::FileExists);
    }
    let mut library = access();
    library.connection = Connection::open(library_file_path)
        .map_err(|e| errors::DatabaseFileError::CreateFailed(e))?;
    library
        .connection
        .execute(CREATE_META_TABLE_SQL, &[])
        .map_err(|e| errors::DatabaseFileError::InitializationFailed(e))?;
    let current_timestamp = chrono::Utc::now().timestamp();
    library
        .connection
        .execute(
            "INSERT INTO meta (created_at, name, author, email, description, version) \
        VALUES (:create, :name, :author, :email, :description, :version)",
            &[
                (":create", current_timestamp),
                (":name", name),
                (":author", author),
                (":email", email),
                (":description", description),
                (":version", CURRENT_VERSION),
            ],
        )
        .map_err(|e| errors::DatabaseFileError::InitializationFailed(e))?;
    library
        .connection
        .execute(CREATE_PHASE_TABLE_SQL, &[])
        .map_err(|e| errors::DatabaseFileError::InitializationFailed(e))?;
    Ok(())
}

/// 打开一个已经存在的词库项目。
pub fn open<P: AsRef<Path>>(path: P) -> anyhow::Result<()> {
    let target_path = path.as_ref().to_path_buf();
    if !target_path.exists() {
        return Err(errors::DatabaseFileError::FileUnexists);
    }
    let mut library = access();
    library.connection =
        Connection::open(target_path).map_err(|e| errors::DatabaseFileError::OpenFailed(e))?;
    if library.is_available() {
        library.check_version()?;
    } else {
        return Err(errors::DatabaseFileError::InvalidProjectFile);
    }
    Ok(())
}

impl Library {
    /// 检查当前数据库连接是否可用，如果数据库查询出错，同样会报告数据库连接不可用。
    pub fn is_available(&self) -> bool {
        let available_check_rs = self
            .as_ref()
            .query_row(
                CHECK_LIBRARY_TABLE_EXISTS_SQL,
                &[(":table_name", "meta")],
                |row| row.get::<usize, usize>(0),
            )
            .ok();
        available_check_rs.map(|count| count > 0).unwrap_or(false)
    }

    /// 检查当前数据库版本是否正确。
    pub fn check_version(&self) -> anyhow::Result<()> {
        let version = self
            .as_ref()
            .query_row("SELECT version FROM meta LIMIT 1", &[], |row| {
                row.get::<&str, u32>("version")
            })
            .map_err(|e| errors::DatabaseFileError::QueryError(e))?;
        if version != CURRENT_VERSION {
            return Err(errors::DatabaseFileError::IncorrectVersion {
                required: CURRENT_VERSION,
                found: version,
            });
        }
        Ok(())
    }
}

impl AsRef<Connection> for Library {
    fn as_ref(&self) -> &Connection {
        self.connection.as_ref()
    }
}
