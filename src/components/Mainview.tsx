import React from "react";
import Sidebar from "./Sidebar/Sidebar";
const Mainview = () => {
  return (
    <div className="w-screen h-screen">
      <div className="h-full w-1/4">
        <Sidebar></Sidebar>
      </div>
    </div>
  );
};

export default Mainview;
