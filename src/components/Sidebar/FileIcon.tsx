import { FaMarkdown, FaFilePdf, FaFolderOpen, FaFolder } from "react-icons/fa";

const FileIcon = ({
  icon,
  dir,
}: {
  icon: "Markdown" | "Pdf" | "Directory";
  dir: boolean;
}) => {
  let IconComponent;
  switch (icon) {
    case "Markdown":
      IconComponent = FaMarkdown;
      break;
    case "Pdf":
      IconComponent = FaFilePdf;
      break;
    case "Directory":
      switch (dir) {
        case true:
          IconComponent = FaFolderOpen;
          break;
        case false:
          IconComponent = FaFolder;
          break;
      }
      break;
    default:
      return null;
  }

  return (
    <div>
      <IconComponent />
    </div>
  );
};

export default FileIcon;
