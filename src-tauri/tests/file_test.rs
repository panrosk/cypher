use cypher_core::files::file::{File, FileExtension, FileType};
use std::io::Write;
use tempfile::Builder;

#[test]
fn test_file_creation() {
    let file = File::new(FileType::File, "test.md", "relative/test.md", None);

    if let FileExtension::Markdown { title, content, .. } = &file.extension {
        assert_eq!(title, "");
        assert_eq!(content, "");
    } else {
        panic!("Expected Markdown extension");
    }
}

#[test]
fn test_read_markdown() {
    let mut temp_file = Builder::new()
        .suffix(".md")
        .tempfile()
        .expect("Failed to create temporary file");

    write!(temp_file, "Expected content").expect("Failed to write to temporary file");

    let file_path = temp_file.path().to_str().unwrap().to_string();

    let mut file = File::new(FileType::File, &file_path, "relative/test.md", None);
    file.read_markdown();

    if let FileExtension::Markdown { title, content, .. } = &file.extension {
        assert_eq!(title, "relative/test.md");
        assert!(content.contains("Expected content"));
    } else {
        panic!("Expected Markdown extension");
    }
}

#[test]
fn test_save_markdown() {
    let temp_file = Builder::new()
        .suffix(".md")
        .tempfile()
        .expect("Failed to create temporary file");

    let file_path = temp_file.path().to_str().unwrap().to_string();

    let mut file = File::new(FileType::File, &file_path, "relative/test_save.md", None);
    file.extension = FileExtension::Markdown {
        title: String::from("Title"),
        content: String::from("Content"),
        links: None,
    };

    file.save_markdown();

    let saved_content = std::fs::read_to_string(&file_path).expect("Failed to read the saved file");

    assert_eq!(saved_content, "Content");
}
