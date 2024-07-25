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
) -> Result<()> {
    if dir.is_file() {
        let relative_path =
            diff_paths(dir, parent).unwrap_or_else(|| PathBuf::from(dir.to_str().unwrap()));
        let file = File::new(
            FileType::File,
            dir.to_str().unwrap(),
            relative_path.to_str().unwrap(),
            None,
        );
        result.push(Some(file));
    } else if dir.is_dir() {
        for entry in fs::read_dir(dir)? {
            let entry = entry?;
            let path = entry.path();

            let relative_path =
                diff_paths(&path, parent).unwrap_or_else(|| PathBuf::from(path.to_str().unwrap()));

            let mut sub: Vec<Option<File>> = Vec::new();
            list_files_on_directory(&path, &mut sub, &path)?;
            let sub_dir = File::new(
                FileType::Directory,
                path.to_str().unwrap(),
                relative_path.to_str().unwrap(),
                Some(sub),
            );
            result.push(Some(sub_dir))
        }
    }

    Ok(())
}
