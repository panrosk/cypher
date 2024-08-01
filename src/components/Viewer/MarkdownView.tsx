import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { app_store } from "../../utils/stores/Appstore";
import { MdEdit, MdMenuBook } from "react-icons/md";
import { invoke } from "@tauri-apps/api/core";

const MarkdownView = () => {
  const appStore = app_store();
  let markdown: MarkdownFile = appStore.current_file
    ? appStore.current_file.extension.Markdown
    : "";
  const [md_state, set_md_state] = useState("edit");
  const handleChange = (content: string) => {
    appStore.change_markdown(appStore.current_file, content, markdown.title);
  };
  const handle_md_state = () => {
    if (md_state === "edit") {
      set_md_state("preview");
    } else {
      set_md_state("edit");
    }
  };
  useEffect(() => {
    let debounceTimeoutId;

    const savedoc = async () => {
      if (appStore.current_file === null) {
        return;
      }
      clearTimeout(debounceTimeoutId);

      debounceTimeoutId = setTimeout(async () => {
        try {
          // Lógica de guardado asíncrono
          await invoke("save_files", { file: appStore.current_file });
          console.log("Document saved");
        } catch (error) {
          console.error("Error saving document:", error);
        }
      }, 2000);
    };
    savedoc();
  }, [appStore.current_file]);
  return (
    <div className="w-full h-screen flex flex-col p-10">
      <div className="w-full py-11 flex justify-between">
        <input
          type="text"
          className="text-5xl w-full focus:outline-none focus:shadow-none text-white bg-[#1e1e1e]"
          value={markdown.title}
        />
        <div className="flex justify-end items-end">
          {md_state === "edit" ? (
            <MdMenuBook onClick={handle_md_state} />
          ) : (
            <MdEdit onClick={handle_md_state} />
          )}
        </div>
      </div>
      <div className="h-full no-scrollbar">
        {md_state === "edit" ? (
          <MDEditor
            preview="edit"
            style={{
              backgroundColor: "#1e1e1e",
              border: "0px",
              WebkitBoxShadow: "none",
              boxShadow: "0px !important",
              fontSize: "22px !important",
              scrollbarWidth: "none",
              msTextOverflow: "none",
            }}
            onChange={handleChange}
            className="no-scrollbar "
            height={"100%"}
            value={markdown.content}
            hideToolbar={true}
          />
        ) : (
          <MDEditor.Markdown
            source={markdown.content}
            className="no-scrollbar h-full overflow-y-scroll"
            style={{
              backgroundColor: "#1e1e1e",
              border: "0px",
              WebkitBoxShadow: "none",
              boxShadow: "0px !important",
              fontSize: "22px !important",
              whiteSpace: "pre-wrap",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MarkdownView;
