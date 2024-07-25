use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub enum FileType {
    File,
    Directory,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct File {
    pub file_type: FileType,
    pub path: String,
    pub relative_path: String,
    pub sub: Option<Vec<Option<File>>>, // Only directories will have sub-files
}

impl File {
    pub fn new(
        file_type: FileType,
        path_to_file: &str,
        relative_path_to_file: &str,
        sub: Option<Vec<Option<File>>>,
    ) -> Self {
        File {
            file_type,
            relative_path: relative_path_to_file.to_string(),
            path: path_to_file.to_string(),
            sub,
        }
    }
}
