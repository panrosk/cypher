import React, { useEffect, useState } from "react";
import { FileItem } from "./FileItem";

interface File {
  type: "File" | "Directory";
  relative_path: string;
  path: string;
  sub?: File[];
  extension: string;
}

const Sidebar = ({ files }: { files?: File[] | null }) => {
  return (
    <div className="h-screen no-scrollbar w-full overflow-hidden p-[40px]">
      <div
        style={{ msScrollbarBaseColor: "black" }}
        className="overflow-y-scroll mt-20 no-scrollbar h-full w-full gap-y-4"
      >
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
