use core::panic;
use std::{fs, str::FromStr};

use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Deserialize, Serialize, Debug, Clone)]
pub enum FileExtension {
    Txt,
    Json,
    Jpg,
    Png,
    Markdown,
    Unknown,
}

impl FileExtension {
    pub fn from_extension(ext: &str) -> Self {
        match ext.to_lowercase().as_str() {
            "txt" => FileExtension::Txt,
            "json" => FileExtension::Json,
            "jpg" => FileExtension::Jpg,
            "png" => FileExtension::Png,
            "md" => FileExtension::Markdown,
            _ => FileExtension::Unknown,
        }
    }
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub enum FileType {
    File,
    Directory,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct File {
    pub file_type: FileType,
    pub path: String,
    pub relative_path: String,
    pub sub: Option<Vec<Option<File>>>,
    pub extension: FileExtension,
}

impl File {
    pub fn new(
        file_type: FileType,
        path_to_file: &str,
        relative_path_to_file: &str,
        sub: Option<Vec<Option<File>>>,
    ) -> Self {
        let extension = std::path::Path::new(path_to_file)
            .extension()
            .and_then(std::ffi::OsStr::to_str)
            .map(FileExtension::from_extension)
            .unwrap_or(FileExtension::Unknown);

        File {
            file_type,
            relative_path: relative_path_to_file.to_string(),
            path: path_to_file.to_string(),
            sub,
            extension,
        }
    }
    pub fn read_files(&self) -> Value {
        let file = match self.extension {
            FileExtension::Markdown => self.read_markdown(),
            _ => panic!("Que estas leyendo mamador"),
        };
        serde_json::json!({
            "content":file.as_str()
        })
    }

    fn read_markdown(&self) -> String {
        let content = fs::read_to_string(&self.path);
        content.unwrap()
    }
}
