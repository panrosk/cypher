interface MarkdownFile {
  title: string;
  content: string;
}

interface File {
  file_type: "File" | "Directory";
  relative_path: string;
  path: string;
  sub?: File[];
  extension?:
    | {
        type: "Markdown";
        markdown: MarkdownFile;
      }
    | {
        type: "txt" | "json" | "other"; // Otros tipos de extensión que no requieren un objeto especial
      };
}
