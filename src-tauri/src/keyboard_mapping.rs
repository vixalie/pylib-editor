use std::collections::HashMap;

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct KeyboardMapping {
    pub name: String,
    pub keys: HashMap<String, Vec<String>>,
}

impl KeyboardMapping {
    /// 创建一个新的键盘映射。
    pub fn new<S: AsRef<str>>(name: S, key: S) -> Self {
        let mut keys = HashMap::new();
        keys.insert(key.as_ref().to_string(), vec![key.as_ref().to_string()]);
        Self {
            name: name.as_ref().to_string(),
            keys,
        }
    }

    // 重命名键盘映射。
    pub fn rename<S: AsRef<str>>(self, name: S) -> Self {
        Self {
            name: name.as_ref().to_string(),
            ..self
        }
    }
}
