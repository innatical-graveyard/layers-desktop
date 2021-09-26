import React from "react";
import { useAuthedPage } from "../../util/auth";

const Store = () => {
  useAuthedPage();

  return (
    <div className="flex  flex-row items-center justify-center w-full">
      <div className="m-auto text-center">
        <h1 className="text-4xl">
          This feature is <span className="text-inndigo">Coming Soon </span>!
        </h1>
        <br />
        <p className="text-lg">Stick around to find out what it does~</p>
      </div>
    </div>
  );
};

export default Store;
