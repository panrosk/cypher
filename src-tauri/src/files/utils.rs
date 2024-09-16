use super::file::{File, FileType};
use anyhow::{Ok, Result};
use pathdiff::diff_paths;
use std::{
    fs,
    path::{Path, PathBuf},
    str::FromStr,
};

pub fn list_files_on_directory(
    dir: &Path,
    result: &mut Vec<Option<File>>,
    parent: &Path,
) -> Result<Vec<Option<File>>> {
    if dir.is_file() {
        let relative_path =
            diff_paths(dir, parent).unwrap_or_else(|| PathBuf::from(dir.to_str().unwrap_or("")));

        let mut file = File::new(
            FileType::File,
            dir.to_str().unwrap_or(""),
            relative_path.to_str().unwrap_or(""),
            None,
        );

        file.read_files();

        result.push(Some(file));
        return Ok(result.to_vec());
    } else if dir.is_dir() {
        let mut sub: Vec<Option<File>> = Vec::new();

        let relative_path =
            diff_paths(dir, parent).unwrap_or_else(|| PathBuf::from(dir.to_str().unwrap_or("")));

        for entry in fs::read_dir(dir)? {
            let entry = entry?;
            let path = entry.path();

            list_files_on_directory(&path, &mut sub, &PathBuf::from(dir.to_str().unwrap_or("")))?;
        }
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

pub fn get_files_list(dir_to_open: &str) -> Result<Vec<Option<File>>> {
    let path_files = PathBuf::from_str(dir_to_open).unwrap();
    let mut files_paths: Vec<Option<File>> = Vec::new();
    let _ = list_files_on_directory(&path_files, &mut files_paths, &path_files);
    Ok(files_paths)
}
