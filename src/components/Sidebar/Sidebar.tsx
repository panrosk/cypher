import { FileItem } from "./FileItem";
const Sidebar = (props) => {
  return (
    <div className="h-screen w-full overflow-hidden  p-[40px]">
      <div className="overflow-y-scroll h-full">
        {props.filelist.map((item: any, indx: any) => {
          return <FileItem key={indx} file={item} />;
        })}
      </div>
    </div>
  );
};

export default Sidebar;
