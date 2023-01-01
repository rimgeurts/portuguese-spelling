import { EyeIcon } from "@heroicons/react/24/outline";
import React, { forwardRef } from "react";

const AccentKeys = ({ accentList, action }) => {
  return (
    <>
      {accentList.map((accentCode, accentCodeIndex) => {
        return (
          <div
            onClick={() => {
              action(accentCode);
            }}
            className={` sm:w-[50px] sm:p-2 p-1 w-[30px] border border-gray-300 rounded-md bg-gray-50 text-gray-700 text-center hover:bg-gray-200 cursor-pointer select-none`}
            key={accentCode}
          >
            {accentCode}
          </div>
        );
      })}
    </>
  );
};

const AccentKeyboard = forwardRef(
  ({ show, setShow, accentList, action, alwaysShow = false }, ref) => {
    return (
      accentList && (
        <div
          className={`${
            show ? "visible" : "invisible"
          } flex gap-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 h-14 w-full  z-10 bg-gray-400/40 backdrop-blur-md items-center justify-center shadow-lg rounded-lg`}
        >
          <div className={"flex flex-wrap gap-1 items-center justify-center"}>
            <AccentKeys accentList={accentList} show={show} action={action} />
          </div>
          <button
            className={
              "ml-2 text-sm font-semibold text-gray-400 bg-white hover:text-gray-500 cursor-pointer border border-gray-300 py-2 px-3 rounded-lg flex items-center justify-center"
            }
            onClick={() => setShow(false)}
          >
            <EyeIcon className={"h-5 w-5 mr-1"} />
            Hide
          </button>
        </div>
      )
    );
  }
);

AccentKeyboard.displayName = "AccentKeyboard";
export default AccentKeyboard;
