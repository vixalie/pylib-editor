use rusqlite::Row;

pub struct Meta {
    name: String,
    author: Option<String>,
    email: Option<String>,
    description: Option<String>,
    version: u32,
}

impl TryFrom<Row<'_>> for Meta {
    type Error = rusqlite::Error;

    fn try_from(row: Row) -> Result<Self, Self::Error> {
        Ok(Self {
            name: row.get("name")?,
            author: row.get("author")?,
            email: row.get("email")?,
            description: row.get("description")?,
            version: row.get("version")?,
        })
    }
}
