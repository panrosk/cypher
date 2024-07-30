import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { markdownStore } from "../../utils/stores/markdownstore";

interface MarkDownFile {
  title: string;
  content: string;
}

const MarkdownView = ({ file }: { file?: MarkDownFile | null }) => {
  const markdown = markdownStore();

  useEffect(() => {
    if (file) {
      setValue(file.content);
    }
  });

  return (
    <div className="w-full h-screen p-10">
      <MDEditor
        preview="edit"
        style={{
          backgroundColor: "#1e1e1e",
          border: "0px",
          WebkitBoxShadow: "none",
          boxShadow: "0px !important",
          fontSize: "22px !important",
        }}
        height={"100%"}
        value={markdown.content}
        onChange={markdown.change_content}
        hideToolbar={true}
      />
    </div>
  );
};

export default MarkdownView;
