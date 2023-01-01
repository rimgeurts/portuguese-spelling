import React, { forwardRef, useEffect, useState } from "react";
import useOnClickOutside from "../hooks/useClickOutside";

const AccentKeys = ({ show, accentList, action }) => {
  return (
    <>
      {accentList.map((accentCode, accentCodeIndex) => {
        return (
          <div
            onClick={() => {
              action(accentCode);
            }}
            className={` sm:w-[50px] sm:p-2 p-1 w-[30px] border border-blue-300 rounded-md bg-blue-50 text-blue-700 text-center hover:bg-blue-200 cursor-pointer select-none`}
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
      if (alwaysShow) {
        return;
      }
      setShow(false);
    });

    useEffect(() => {
      if (alwaysShow) {
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
      if (alwaysShow) {
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
        <div
          className={`${
            show ? "visible" : "invisible"
          } flex gap-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 h-14 w-full  z-10 bg-blue-50 items-center justify-center shadow-md rounded-lg`}
        >
          <div className={"flex flex-wrap gap-1 items-center justify-center"}>
            <AccentKeys accentList={accentList} show={show} action={action} />
          </div>
          <button onClick={() => setShow(false)}>Hide</button>
        </div>
      )
    );
  }
);

AccentKeyboard.displayName = "AccentKeyboard";
export default AccentKeyboard;
