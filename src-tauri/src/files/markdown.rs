use crate::files::file::ConnectedLink;
use pulldown_cmark::{Event, LinkType, Parser, Tag};

fn link_type_to_string(link_type: LinkType) -> String {
    match link_type {
        LinkType::Inline => "inline".to_string(),
        LinkType::Reference => "reference".to_string(),
        LinkType::Collapsed => "collapsed".to_string(),
        LinkType::Email => "email".to_string(),
        LinkType::Autolink => "autolink".to_string(),
        LinkType::Shortcut => "shortcut".to_string(),
        LinkType::ReferenceUnknown => "reference_unknown".to_string(),
        LinkType::ShortcutUnknown => "shortcut_unknown".to_string(),
        LinkType::CollapsedUnknown => "collapsed_unknown".to_string(),
    }
}

pub fn get_links(md_string: &str) -> Option<Vec<ConnectedLink>> {
    let parsed = Parser::new(md_string);
    let mut links = Vec::new();

    for event in parsed {
        if let Event::Start(Tag::Link {
            title,
            link_type,
            dest_url,
            ..
        }) = event
        {
            let link_type_str = link_type_to_string(link_type);
            links.push(ConnectedLink::new(
                title.to_string(),
                link_type_str,
                dest_url.to_string(),
            ));
        }
    }

    if links.is_empty() {
        None
    } else {
        Some(links)
    }
}
