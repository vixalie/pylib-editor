use std::{
    fs::{DirBuilder, File},
    io::{Read, Write},
    ops::Deref,
    path::{Path, PathBuf},
    sync::{Mutex, MutexGuard},
};

use serde::{Deserialize, Serialize};

use crate::keyboard_mapping::KeyboardMapping;

#[derive(Debug, Serialize, Deserialize)]
pub struct Configuration {
    pub mappings: Vec<KeyboardMapping>,
}

static CONFIG_INSTANCE: Mutex<Configuration> = Mutex::new(Configuration {
    mappings: Vec::new(),
});

impl Configuration {
    // 获取一个可以用于访问应用配置信息的引用。
    pub fn get() -> MutexGuard<'static, Configuration> {
        CONFIG_INSTANCE.lock().unwrap()
    }

    // 确认应用数据目录的存在，如果数据目录不存在，那么将自动创建。
    fn ensure_data_dir() -> anyhow::Result<PathBuf> {
        let config_dir = directories::ProjectDirs::from("xyz", "archgrid", "pylib").ok_or(
            anyhow::anyhow!("unable to fetch application data directory"),
        )?;
        let data_dir = config_dir.data_dir();
        if !data_dir.exists() {
            let mut dir_creator = DirBuilder::new();
            dir_creator
                .recursive(true)
                .create(config_dir.data_dir())
                .unwrap();
        }
        Ok(data_dir.to_path_buf())
    }

    // 确认应用配置文件存在，如果配置文件不存在，那么将自动创建一个空白的配置文件。
    fn ensure_config_file<P: AsRef<Path>>(config_path: P) -> anyhow::Result<File> {
        let config_file_path = config_path.as_ref().join("config.toml");
        if !config_file_path.exists() {
            let mut file = File::create(config_file_path.clone())?;
            let configuration = Self::get();
            let toml_string = toml::to_string(configuration.deref())?;
            file.write_all(toml_string.as_bytes())?;
        }
        let config_file = File::open(config_file_path)?;
        Ok(config_file)
    }

    // 从应用配置文件中加载配置信息，即便应用配置文件是空白的。
    pub fn load_settings() -> anyhow::Result<()> {
        let mut config_file = Self::ensure_config_file(Self::ensure_data_dir()?)?;
        let mut config_file_content = String::new();
        config_file.read_to_string(&mut config_file_content)?;
        let config: Configuration = toml::from_str(&config_file_content).unwrap();
        let mut configuration = Self::get();
        *configuration = config;
        Ok(())
    }
}
