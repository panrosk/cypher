use anyhow::Result;
use cypher_v2_lib::files::file::{File, FileExtension, FileType};
use cypher_v2_lib::files::utils::list_files_on_directory;
use std::env::temp_dir;
use std::fs::{self, File as StdFile};
use std::path::{Path, PathBuf};
use tempfile::{tempdir, tempfile};

#[test]
fn test_list_directory() -> Result<()> {
    let temp_dir = tempdir()?;
    let dir_path = temp_dir.path();

    let mut result: Vec<Option<File>> = Vec::new();
    let files = list_files_on_directory(dir_path, &mut result, dir_path)?;

    let result_to_test = File::new(
        FileType::Directory,
        dir_path.to_str().unwrap(),
        "",
        Some(Vec::new()),
    );

    assert_eq!(files, vec![Some(result_to_test)]);
    Ok(())
}
