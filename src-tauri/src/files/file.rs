use super::markdown::get_links;
use anyhow::{Error, Result};
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::Path;

#[derive(Deserialize, Serialize, Debug, Clone, PartialEq, Eq)]
pub struct ConnectedLink {
    title: String,
    link_type: String,
    dest_url: String,
}

impl ConnectedLink {
    pub fn new(title: String, link_type: String, dest_url: String) -> Self {
        ConnectedLink {
            title,
            link_type,
            dest_url,
        }
    }
}

#[derive(Deserialize, Serialize, Debug, Clone, PartialEq, Eq)]
pub enum FileExtension {
    Txt,
    Json,
    Jpg,
    Png,
    Canvas,
    Epub,
    Markdown {
        title: String,
        content: String,
        links: Option<Vec<ConnectedLink>>,
    },
    Pdf,
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
            "canvas" => FileExtension::Canvas,
            "md" => FileExtension::Markdown {
                title: String::new(),
                content: String::new(),
                links: None,
            },
            "epub" => FileExtension::Epub,
            "pdf" => FileExtension::Pdf,
            _ => FileExtension::Unknown,
        }
    }
}

#[derive(Debug, Deserialize, Serialize, Clone, PartialEq, Eq)]
pub enum FileType {
    File,
    Directory,
}

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq, Eq)]
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

    pub fn read_files(&mut self) -> Result<()> {
        match &self.extension {
            FileExtension::Markdown { .. } => Ok(self.read_markdown()),
            _ => Err(Error::msg("Unsupported file extension")), // Devuelve un error específico
        }
    }

    pub fn save_files(&mut self) {
        match &self.extension {
            FileExtension::Markdown { .. } => self.save_markdown(),
            _ => panic!("Unsupported file type for saving"),
        }
    }

    pub fn save_markdown(&mut self) {
        if let FileExtension::Markdown { content, .. } = &self.extension {
            match fs::write(&self.path, content) {
                Ok(()) => (),
                Err(e) => panic!("Error writing to file: {}", e),
            }
        }
    }

    pub fn read_markdown(&mut self) {
        if let FileExtension::Markdown { title, content, .. } = &mut self.extension {
            if !title.is_empty() || !content.is_empty() {
                return;
            }
            let content_string = fs::read_to_string(&self.path).expect("Failed to read file");
            let links = get_links(&content_string);

            self.extension = FileExtension::Markdown {
                title: self.relative_path.clone(),
                content: content_string,
                links,
            }
        } else {
            panic!("Invalid extension for read_markdown");
        }
    }
}
