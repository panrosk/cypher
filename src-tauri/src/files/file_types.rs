use core::panic;
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::Path;

#[derive(Deserialize, Serialize, Debug, Clone)]
pub enum FileExtension {
    Txt,
    Json,
    Jpg,
    Png,
    Markdown { title: String, content: String },
    Directory,
    Unknown,
}

impl FileExtension {
    pub fn from_extension(ext: &str) -> Self {
        match ext.to_lowercase().as_str() {
            "txt" => FileExtension::Txt,
            "json" => FileExtension::Json,
            "jpg" => FileExtension::Jpg,
            "png" => FileExtension::Png,
            "md" => FileExtension::Markdown {
                title: String::new(),
                content: String::new(),
            },

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
        let extension = Path::new(path_to_file)
            .extension()
            .and_then(std::ffi::OsStr::to_str)
            .map(FileExtension::from_extension)
            .unwrap_or_else(|| {
                if Path::new(path_to_file).is_dir() {
                    FileExtension::Directory
                } else {
                    FileExtension::Unknown
                }
            });

        File {
            file_type,
            relative_path: relative_path_to_file.to_string(),
            path: path_to_file.to_string(),
            sub,
            extension,
        }
    }
    pub fn read_files(&mut self) {
        match &self.extension {
            FileExtension::Markdown { .. } => self.read_markdown(),
            _ => panic!("Que estas leyendo"),
        };
    }

    pub fn save_files(&mut self) {
        match &self.extension {
            FileExtension::Markdown { .. } => self.save_markdown(),
            _ => panic!("Que estas guardado boy"),
        }
    }

    fn save_markdown(&mut self) {
        if let FileExtension::Markdown { title, content } = &self.extension {
            match fs::write(&self.path, content) {
                Ok(()) => return,
                Err(e) => panic!(
                    "Crazy things my blud! There is an error in writing files: {}",
                    e
                ),
            }
        }
    }

    /*    change to result to err when unsoported filetypes */
    fn read_markdown(&mut self) {
        if let FileExtension::Markdown { title, content } = &self.extension {
            if !title.is_empty() || !content.is_empty() {
                return;
            }
            let content = fs::read_to_string(&self.path).expect("Failed to read file");

            self.extension = FileExtension::Markdown {
                title: self.relative_path.clone(),
                content,
            }
        } else {
            panic!("Invalid extension for read_markdown");
        }
    }
}
