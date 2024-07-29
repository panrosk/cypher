use crate::files::file_types::File;
use anyhow::Result;
use std::{fs, path::PathBuf, str::FromStr};

use super::file_utils::list_files_on_directory;

pub fn get_files_list(dir_to_open: &str) -> Result<Vec<Option<File>>> {
    let path_files = PathBuf::from_str(dir_to_open).unwrap();
    let mut files_paths: Vec<Option<File>> = Vec::new();
    let _ = list_files_on_directory(&path_files, &mut files_paths, &path_files);
    Ok(files_paths)
}

fn config_init_folder(cryp_dir: &str) -> Result<()> {
    let init_folder = PathBuf::from(".cypher");
    let mut base_path = PathBuf::from(cryp_dir);
    base_path.push(init_folder);

    if !base_path.exists() {
        fs::create_dir_all(&base_path)?;
    };

    Ok(())
}
