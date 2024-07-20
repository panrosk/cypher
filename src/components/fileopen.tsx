import { open } from "@tauri-apps/plugin-dialog";
import React from "react";

interface fileOpenOptions {
  content: string;
}

const FileOpen = (props: fileOpenOptions) => {
  async function getFile() {
    const file = await open({
      title: "Select your Crypt",
      directory: true,
    });
  }

  return (
    <>
      <button
        className="bg-white rounded-full px-10 text-center py-2 text-black"
        onClick={getFile}
      >
        {props.content}
      </button>
    </>
  );
};

export default FileOpen;
