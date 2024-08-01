import { useEffect, useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import { Viewer } from ".";
import { Store } from "@tauri-apps/plugin-store";
import logo from "../assets/Cypherblack.svg";
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
      setFiles(files.current_files_on_directory[0].sub as File[]);
    };

    fetchData();
  }, []);

  return (
    <div className="w-screen flex overflow-hidden text-white h-screen">
      <div className="h-full w-1/3 bg-[#171717]">
        <Sidebar files={files}></Sidebar>
      </div>
      <div className="h-full w-full bg-[#1e1e1e]">
        <Viewer />
      </div>
    </div>
  );
};

export default Mainview;
