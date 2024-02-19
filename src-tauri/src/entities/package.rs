use std::collections::{BTreeMap, HashSet, VecDeque};

use serde::{Deserialize, Serialize};

use super::{Meta, Phase};

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Package {
    pub meta: Meta,
    pub phases: VecDeque<Phase>,
    #[serde(skip)]
    index: BTreeMap<String, HashSet<usize>>,
}

impl Package {
    pub fn new(meta: Meta) -> Self {
        Self {
            meta,
            phases: VecDeque::new(),
            index: BTreeMap::new(),
        }
    }
}
