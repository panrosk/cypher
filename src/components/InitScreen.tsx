import React from "react";
import logo from "../assets/Cypherblack.svg";
import InitScreenItemList from "./InitScreenItemList";
import { OpenOrCreateVault } from ".";

const InitScreen = () => {
  const exampleOptions = [
    {
      header: "Open folder as crypt",
      subheader: "Choose an existing folder as your crypt.",
      content: "Open",
      type: "open",
    },
    {
      header: "Create a new crypt",
      subheader: "Create a new dir as a crypt for your notes.",
      content: "Create",
      type: "create",
    },
  ];
  return (
    <div className="w-full p-bigscreen bg-[#1e1e1e]  flex h-full">
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
        <div className="flex gap-y-20 flex-col w-full">
          {exampleOptions.map((item, _key) => {
            return (
              <InitScreenItemList
                key={_key}
                header={item.header}
                subheader={item.subheader}
              >
                <OpenOrCreateVault content={item.content} type={item.type} />
              </InitScreenItemList>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InitScreen;
