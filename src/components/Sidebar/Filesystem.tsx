import { FileItem } from "./FileItem";

interface File {
  type: "File" | "Directory";
  relative_path: string;
  path: string;
  sub?: File[];
  extension: string;
}

const FileSystem = ({ files }: { files?: File[] | null }) => {
  return (
    <div className="py-20 h-full">
      <div
        style={{ msScrollbarBaseColor: "black" }}
        className="overflow-y-scroll  no-scrollbar h-full w-full gap-y-4"
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

export default FileSystem;
