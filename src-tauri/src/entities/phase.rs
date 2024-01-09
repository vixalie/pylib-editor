use rusqlite::Row;
use std::cmp::Ordering;

pub struct Phase {
    pub id: u64,
    pub phase: String,
    pub pinyin: String,
    pub weight: u32,
    pub draft: u8,
}

impl TryFrom<Row<'_>> for Phase {
    type Error = rusqlite::Error;

    fn try_from(row: Row) -> Result<Self, Self::Error> {
        Ok(Self {
            id: row.get("id")?,
            phase: row.get("name")?,
            pinyin: row.get("pinyin")?,
            weight: row.get("weight")?,
            draft: row.get("draft")?,
        })
    }
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
        self.draft == 1
    }

    // 将此条的拼音拆分成逐字的拼音。
    pub fn pinyin(&self) -> Vec<String> {
        self.pinyin.split('\'').map(|s| s.to_string()).collect()
    }
}
