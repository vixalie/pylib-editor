use std::time::SystemTime;

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Meta {
    pub name: String,
    pub author: Option<String>,
    pub email: Option<String>,
    pub description: Option<String>,
    pub created_at: u64,
    pub last_modified_at: u64,
    pub version: u32,
}

impl Meta {
    pub fn new(name: &str) -> Self {
        let create_time = SystemTime::now()
            .duration_since(SystemTime::UNIX_EPOCH)
            .unwrap()
            .as_secs();
        Self {
            name: name.to_string(),
            author: None,
            email: None,
            description: None,
            created_at: create_time,
            last_modified_at: create_time,
            version: super::LIBRARY_VERISON,
        }
    }

    pub fn set_author(self, author: &str) -> Self {
        Self {
            author: Some(author.to_string()),
            ..self
        }
    }

    pub fn set_email(self, email: &str) -> Self {
        Self {
            email: Some(email.to_string()),
            ..self
        }
    }

    pub fn set_description(self, description: &str) -> Self {
        Self {
            description: Some(description.to_string()),
            ..self
        }
    }

    pub fn update_modified_time(&mut self) {
        self.last_modified_at = SystemTime::now()
            .duration_since(SystemTime::UNIX_EPOCH)
            .unwrap()
            .as_secs();
    }
}
