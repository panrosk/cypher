import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";
import { uiStore } from "../utils/stores/uistore";

interface fileOpenOptions {
  content: string;
  type: "open" | "create";
}

const FileOpen = (props: fileOpenOptions) => {
  const screen = uiStore();
  async function onClickAction() {
    const file = await open({
      title: "Select your Crypt",
      directory: true,
    });

    if (file !== null) {
      invoke("set_dir", { dir: file });
      screen.change_to_main();
    }
  }

  return (
    <>
      <button
        className="bg-white rounded-full px-10 text-center py-2 text-black"
        onClick={onClickAction}
      >
        {props.content}
      </button>
    </>
  );
};

export default FileOpen;
