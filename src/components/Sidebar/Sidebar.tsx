import React, { useEffect, useState } from "react";
import { FileItem } from "./FileItem";

interface File {
  type: "File" | "Directory";
  relative_path: string;
  path: string;
  sub?: File[];
}

const Sidebar = ({ files }: { files?: File[] | null }) => {
  return (
    <div className="h-screen w-full overflow-hidden p-[40px]">
      <div className="overflow-y-scroll h-full">
        {files &&
          Array.isArray(files) &&
          files.map((item, indx) => {
            return <FileItem key={indx} file={item} />;
          })}
      </div>
    </div>
  );
};

export default Sidebar;
