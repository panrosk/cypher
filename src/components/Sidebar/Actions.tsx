import { CgFolderAdd } from "react-icons/cg";
import { MdNoteAdd } from "react-icons/md";

const Actions = () => {
  let actions = [
    {
      name: "Add a new note",
      icon: <MdNoteAdd className="" />,
      actions: () => {
        console.log("Hello");
      },
    },
    {
      name: "Create a new Folder",
      icon: <CgFolderAdd />,
      actions: () => {
        console.log("Hello");
      },
    },
  ];

  return (
    <div className="w-full flex flex-col">
      {actions.map((act, indx) => {
        return (
          <div key={indx} onClick={act.actions} className="flex gap-x-2">
            {act.icon}
            <p className="text-small">{act.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Actions;
