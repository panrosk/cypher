import React, { ReactNode } from "react";

interface InitScreenTextItem {
  header: string;
  subheader: string;
  children: ReactNode;
}

const InitScreenItemList = (props: InitScreenTextItem) => {
  return (
    <div className="flex gap-x-10 px-4 justify-between">
      <div className="h-full flex flex-col gap-y-1 2xl:gap-y-2">
        <h2 className="2xl:text-2xl font-bold text-xl">{props.header}</h2>
        <p className="2xl:text-lg font-light text-md">{props.subheader}</p>
      </div>
      <div>{props.children}</div>
    </div>
  );
};

export default InitScreenItemList;
