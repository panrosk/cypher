import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";
import { app_store } from "../../utils/stores/Appstore";
import FileIcon from "./FileIcon";

interface File {
  file_type: "File" | "Directory";
  relative_path: string;
  path: string;
  sub?: File[];
  extension: string;
}

export const FileItem = ({ file }: { file: File }) => {
  const [isExpanded, setExpanded] = useState(false);
  const appStore = app_store();
  const on_file_click = async (file: File) => {
    const file_to_read = await invoke("read_file", { file: file });
    appStore.change_content(file_to_read);
  };

  const handleToggle = () => {
    setExpanded(!isExpanded);
  };

  return (
    <div className="no-scrollbar w-full">
      {file.file_type === "File" ? (
        <p className="flex gap-x-2 py-1" onClick={() => on_file_click(file)}>
          <FileIcon icon={file.extension} />
          {file.relative_path}
        </p>
      ) : (
        <>
          <p
            className="text-small flex gap-x-2"
            onClick={handleToggle}
            style={{ cursor: "pointer" }}
          >
            {file.sub &&
              file.sub.length > 0 &&
              (isExpanded ? (
                <FileIcon icon="Directory" dir={true} />
              ) : (
                <FileIcon icon="Directory" dir={false} />
              ))}{" "}
            {file.relative_path}
          </p>
          {isExpanded && file.sub && file.sub.length > 0 && (
            <div className="gap-y-4 text-small" style={{ paddingLeft: 20 }}>
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
