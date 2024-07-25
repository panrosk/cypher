import React, { useState } from "react";

interface File {
  type: "File" | "Directory";
  relative_path?: string;
  path: string;
  sub?: File[];
}

export const FileItem = ({ file }: { file: File }) => {
  const [isExpanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!isExpanded);
  };

  return (
    <div>
      {file.type === "File" ? (
        <p>{"| " + file.path}</p>
      ) : (
        <>
          <p onClick={handleToggle}>
            {isExpanded ? "● " : "○ "} {file.path}
          </p>
          {isExpanded && (
            <div style={{ paddingLeft: 20 }}>
              {file.sub &&
                file.sub.map((subFile, index) => (
                  <FileItem key={index} file={subFile} />
                ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
