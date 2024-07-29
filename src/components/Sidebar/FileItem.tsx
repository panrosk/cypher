import { invoke } from "@tauri-apps/api/core";
import { emit } from "@tauri-apps/api/event";
import { useState } from "react";
import { markdownStore } from "../../utils/stores/markdownstore";

interface File {
  file_type: "File" | "Directory";
  relative_path: string;
  path: string;
  sub?: File[];
}

export const FileItem = ({ file }: { file: File }) => {
  const [isExpanded, setExpanded] = useState(false);
  const markdown = markdownStore();
  const on_file_click = async (file: File) => {
    const file_to_read = await invoke("read_file", { file: file });
    console.log(file_to_read.content);
    markdown.change_content(file_to_read.content);
  };

  const handleToggle = () => {
    setExpanded(!isExpanded);
  };

  return (
    <div>
      {file.file_type === "File" ? (
        <button onClick={() => on_file_click(file)}>
          {"Oscar" + file.relative_path}
        </button>
      ) : (
        <>
          <p onClick={handleToggle} style={{ cursor: "pointer" }}>
            {file.sub && file.sub.length > 0 && (isExpanded ? "● " : "○ ")}{" "}
            {file.relative_path}
          </p>
          {isExpanded && file.sub && file.sub.length > 0 && (
            <div className="gap-y-4" style={{ paddingLeft: 20 }}>
              {file.sub.map((subFile, index) => (
                <FileItem key={index} file={subFile} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
