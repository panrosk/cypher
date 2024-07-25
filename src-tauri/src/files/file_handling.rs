use anyhow::{Context, Result};
use std::{fs, path::PathBuf, str::FromStr};

use super::file_utils::list_files_on_directory;

pub fn get_files_list(dir_to_open: &str) -> Result<Vec<Option<super::file_types::File>>> {
    let path_files = PathBuf::from_str(dir_to_open).unwrap();
    let mut files_paths: Vec<Option<super::file_types::File>> = Vec::new();
    let _ = list_files_on_directory(&path_files, &mut files_paths, &path_files);
    Ok(files_paths)
}
