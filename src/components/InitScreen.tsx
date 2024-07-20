import React from "react";
import logo from "../assets/Cypherblack.svg";
import InitScreenItemList from "./InitScreenItemList";
import { FileButton } from ".";

const InitScreen = () => {
  const exampleOptions = [
    {
      header: "Open folder as crypt",
      subheader: "Choose an existing folder as your crypt.",
    },
  ];
  return (
    <div className="w-full p-bigscreen  flex h-full">
      <div className="w-1/3 flex flex-col h-full border-white border-r-4">
        <div>
          <img src={logo} className="h-20 w-20" alt="" />
        </div>
        <div className="w-full h-full flex flex-col justify-center">
          <div className="flex flex-col gap-y-4">
            <h1 className=" text-4xl 2xl:text-6xl font-bold text-platform">
              Cypher
            </h1>
            <p>
              Open Source Knowledge <br /> Management for all.
            </p>
          </div>
        </div>
      </div>
      <div className="w-2/3 grid place-content-center">
        <div className="flex flex-col w-full">
          {exampleOptions.map((item, _key) => {
            return (
              <InitScreenItemList
                header={item.header}
                subheader={item.subheader}
              >
                <FileButton content="Open" />
              </InitScreenItemList>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InitScreen;
