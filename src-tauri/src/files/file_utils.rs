use super::file_types::{File, FileType};
use anyhow::{Ok, Result};
use pathdiff::diff_paths;
use std::{
    fs,
    path::{Path, PathBuf},
};

pub fn list_files_on_directory(
    dir: &Path,
    result: &mut Vec<Option<File>>,
    parent: &Path,
) -> Result<Vec<Option<File>>> {
    if dir.is_file() {
        let relative_path =
            diff_paths(dir, parent).unwrap_or_else(|| PathBuf::from(dir.to_str().unwrap_or("")));

        let file = File::new(
            FileType::File,
            dir.to_str().unwrap_or(""),
            relative_path.to_str().unwrap_or(""),
            None,
        );

        result.push(Some(file));
        return Ok(result.to_vec());
    } else if dir.is_dir() {
        let mut sub: Vec<Option<File>> = Vec::new();
        for entry in fs::read_dir(dir)? {
            let entry = entry?;
            let path = entry.path();

            list_files_on_directory(&path, &mut sub, parent)?;
        }
        let relative_path =
            diff_paths(dir, parent).unwrap_or_else(|| PathBuf::from(dir.to_str().unwrap_or("")));
        let sub_dir = File::new(
            FileType::Directory,
            dir.to_str().unwrap_or(""),
            relative_path.to_str().unwrap_or(""),
            Some(sub),
        );
        result.push(Some(sub_dir));
    }

    Ok(result.to_vec())
}
