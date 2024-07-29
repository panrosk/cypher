import { useEffect, useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import { Viewer } from ".";
import { Store } from "@tauri-apps/plugin-store";
interface File {
  type: "File" | "Directory";
  relative_path?: string;
  path: string;
  sub?: File[];
}

const Mainview = () => {
  const [files, setFiles] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const store = new Store("store.bin");
      const files = await store.get("config_store");
      setFiles(files.current_files_on_directory as File[]);
      console.log(files.current_files_on_directory as File[]);
    };

    fetchData();
  }, []);

  return (
    <div className="w-screen flex overflow-hidden text-white h-screen">
      <div className="h-full w-1/4">
        <Sidebar files={files}></Sidebar>
      </div>
      <div className="h-full w-3/4">
        <Viewer />
      </div>
    </div>
  );
};

export default Mainview;
