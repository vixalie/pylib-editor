use std::{
    fs::File,
    io::{BufReader, Write},
    path::Path,
    sync::{Arc, Mutex, RwLock},
};

use once_cell::sync::Lazy;

use crate::{
    entities::{Meta, Package},
    errors::{self, Result},
};

static LIBRARY: Lazy<Arc<Mutex<String>>> = Lazy::new(|| Arc::new(Mutex::new("".to_string())));
static PACKAGE: Lazy<Arc<RwLock<Package>>> =
    Lazy::new(|| Arc::new(RwLock::new(Package::new(Meta::new("")))));

fn ensure_path<P: AsRef<Path>>(target_path: P) -> Result<()> {
    let path = target_path.as_ref();
    if !path.exists() {
        std::fs::create_dir_all(path).map_err(|e| errors::LibraryError::PathCreateFailed(e))?;
    }
    Ok(())
}

/// 获取当前词库保存路径的原子化引用。
/// 这个方法不必要让外部其他功能使用。
fn acquire_library() -> Arc<Mutex<String>> {
    Arc::clone(&LIBRARY)
}

/// 获取当前词库的原子化引用。
pub fn acquire_package() -> Arc<RwLock<Package>> {
    Arc::clone(&PACKAGE)
}

/// 将指定内容保存到已经指定路径的词库文件中。
/// - `content`： 要保存的内容。
pub fn save_library(content: &Package) -> Result<()> {
    let library_ref = acquire_library();
    let library = library_ref.lock().unwrap();
    let mut file = if library.len() > 0 {
        let library_path = Path::new(library.as_str());
        if library_path.exists() {
            File::create(library_path).map_err(|e| errors::LibraryError::OpenFailed(e))?
        } else {
            File::create(library_path).map_err(|e| errors::LibraryError::CreateFailed(e))?
        }
    } else {
        return Err(errors::LibraryError::InvalidFile);
    };
    let bin_content =
        bincode::serialize(content).map_err(|e| errors::LibraryError::SerializeFailed(e))?;
    file.write_all(bin_content.as_slice())
        .map_err(|e| errors::LibraryError::WriteFailed(e))?;
    Ok(())
}

/// 创建一个新的词库项目。
pub fn new<P: AsRef<Path>>(
    target_path: P,
    name: &str,
    author: Option<&str>,
    emal: Option<&str>,
    description: Option<&str>,
) -> Result<()> {
    {
        let library_ref = acquire_library();
        let mut library = library_ref.lock().unwrap();
        ensure_path(&target_path)?;
        let file_path = target_path.as_ref().join(format!("{}.pylib", name));
        *library = file_path.to_str().unwrap().to_string();
    }
    let library_meta = Meta::new(name);
    let library_meta = if let Some(author) = author {
        library_meta.set_author(author)
    } else {
        library_meta
    };
    let library_meta = if let Some(email) = emal {
        library_meta.set_email(email)
    } else {
        library_meta
    };
    let library_meta = if let Some(description) = description {
        library_meta.set_description(description)
    } else {
        library_meta
    };
    let library_content = Package::new(library_meta);
    let mut global_package = PACKAGE.write().unwrap();
    *global_package = library_content;
    save_library(&global_package)?;

    Ok(())
}

/// 从现有文件中打开一个词库项目。
pub fn open<P: AsRef<Path>>(target_path: P) -> Result<()> {
    let library_ref = acquire_library();
    let mut library = library_ref.lock().unwrap();
    *library = target_path.as_ref().to_str().unwrap().to_string();
    let lib_file = File::open(target_path).map_err(|e| errors::LibraryError::OpenFailed(e))?;
    let reader = BufReader::new(lib_file);
    let lib_content: Package = bincode::deserialize_from(reader)
        .map_err(|e| errors::LibraryError::DeserializeFailed(e))?;
    if lib_content.meta.version > crate::entities::LIBRARY_VERISON {
        return Err(errors::LibraryError::IncorrectVersion {
            required: crate::entities::LIBRARY_VERISON,
            found: lib_content.meta.version,
        });
    }
    let mut global_package = PACKAGE.write().unwrap();
    *global_package = lib_content;
    Ok(())
}
