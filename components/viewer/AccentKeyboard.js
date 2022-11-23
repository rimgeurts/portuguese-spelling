import React, { forwardRef, useEffect, useState } from "react";
import useOnClickOutside from "../hooks/useClickOutside";
import { set } from "react-hook-form";
import { act } from "react-dom/test-utils";

const AccentKeys = ({ show, accentList, action }) => {
  return (
    <>
      {accentList.map((accentCode, accentCodeIndex) => {
        return (
          <div
            onClick={() => {
              action(accentCode);
            }}
            className={`shadow-md sm:w-[50px] sm:p-2 p-1 w-[30px] border-2 border-blue-500 rounded-md bg-blue-100 text-blue-500 text-center hover:bg-blue-200 cursor-pointer select-none`}
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
  (
    {
      accentList,
      action,
      triggerElementName,
      showSubmitButton,
      alwaysShow = false,
    },
    ref
  ) => {
    const [show, setShow] = useState(false);

    useOnClickOutside(ref, () => {
      if(alwaysShow) {
        return;
      }
      setShow(false);
    });

    useEffect(() => {
      if(alwaysShow) {
        return;
      }

      const handleClick = (event) => {
        setShow(true);
      };

      const element = ref?.current;
      element.addEventListener("click", handleClick);

      return () => {
        element.removeEventListener("click", handleClick);
      };
    }, []);

    useEffect(() => {
      if(alwaysShow) {
        setShow(true);
        return;
      }
      const handleFocus = () => {
        const focussedElement = document.activeElement.name;
        if (focussedElement === triggerElementName) {
          setShow(true);
          return;
        }
        if (!!focussedElement && focussedElement !== triggerElementName) {
          setShow(false);
        }
      };

      document.addEventListener("focus", handleFocus, true);

      return () => {
        document.removeEventListener("focus", handleFocus);
      };
    }, []);

    return (
      accentList && (
        <div className={`${show ? "visible" : "invisible"} flex gap-3`}>
          <div className={"flex flex-wrap gap-1 items-center justify-center"}>
            <AccentKeys accentList={accentList} show={show} action={action} />
          </div>
          {showSubmitButton && (
            <button
              type="submit"
              className="max-h-11 shadow-md inline-flex items-center rounded border border-transparent bg-blue-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit
            </button>
          )}
        </div>
      )
    );
  }
);

AccentKeyboard.displayName = "AccentKeyboard";
export default AccentKeyboard;
