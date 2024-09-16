use cypher_core::files::file::ConnectedLink;
use cypher_core::files::markdown::get_links;

#[test]
fn test_get_links_with_inline_link() {
    let md = "[example](http://example.com)";
    let result = get_links(md).unwrap();

    assert_eq!(result.len(), 1);
    assert_eq!(
        result[0],
        ConnectedLink::new(
            "".to_string(), // Assuming no title is specified in the inline link
            "inline".to_string(),
            "http://example.com".to_string()
        )
    );
}

#[test]
fn test_get_links_with_multiple_links() {
    let md = "[example1](http://example1.com) [example2](http://example2.com)";
    let result = get_links(md).unwrap();

    assert_eq!(result.len(), 2);
    assert_eq!(
        result[0],
        ConnectedLink::new(
            "".to_string(),
            "inline".to_string(),
            "http://example1.com".to_string()
        )
    );
    assert_eq!(
        result[1],
        ConnectedLink::new(
            "".to_string(),
            "inline".to_string(),
            "http://example2.com".to_string()
        )
    );
}

#[test]
fn test_get_links_with_no_links() {
    let md = "This is a test with no links.";
    let result = get_links(md);

    assert!(result.is_none());
}

#[test]
fn test_get_links_with_email_link() {
    let md = "Email me at <test@example.com>";
    let result = get_links(md).unwrap();

    assert_eq!(result.len(), 1);
    assert_eq!(
        result[0],
        ConnectedLink::new(
            "".to_string(),
            "email".to_string(),
            "test@example.com".to_string()
        )
    );
}
