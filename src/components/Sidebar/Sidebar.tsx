import Actions from "./Actions";
import FileSystem from "./Filesystem";

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
      <Actions />
      <FileSystem files={files} />
    </div>
  );
};

export default Sidebar;
