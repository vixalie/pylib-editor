use serde::{Deserialize, Serialize};
use std::cmp::Ordering;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Phase {
    pub id: u64,
    pub phase: String,
    pub pinyin: String,
    abbr: String,
    pub weight: u32,
    pub draft: bool,
}

impl Ord for Phase {
    fn cmp(&self, other: &Self) -> Ordering {
        self.id.cmp(&other.id)
    }
}

impl PartialOrd for Phase {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.id.cmp(&other.id))
    }
}

impl PartialEq for Phase {
    fn eq(&self, other: &Self) -> bool {
        self.id == other.id
    }
}

impl Eq for Phase {}

impl Phase {
    /// 检查当前此条是否为草稿。
    pub fn is_draft(&self) -> bool {
        self.draft
    }

    // 将此条的拼音拆分成逐字的拼音。
    pub fn pinyin(&self) -> Vec<String> {
        self.pinyin.split('\'').map(|s| s.to_string()).collect()
    }

    // 测试当前词条是否包含指定的字符串，用于词条的模糊查找功能。
    pub fn contains(&self, pattern: &str) -> bool {
        self.phase.contains(pattern) || self.pinyin.contains(pattern) || self.abbr.contains(pattern)
    }
}
