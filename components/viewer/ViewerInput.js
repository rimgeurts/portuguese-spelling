import * as PropTypes from "prop-types";
import React from "react";

export function ViewerInput(props) {
  return (
    <form onSubmit={props.onSubmit} className="sm:mt-4 mt-4">
      <div className="w-full ">
        <label
          htmlFor="text"
          className="block text-sm font-medium text-gray-700"
        ></label>
        {(!props.updateResultStatus.isSuccess ||
          props.updateResultStatus.data?.result === "correct") && (
          <input
            autoComplete="off"
            type="text"
            {...props.register}
            className="leading-10 block w-full  focus:ring-0 text-gray-900 text-center border-2 border-gray-200 border-dashed rounded-md shadow-sm focus:border-dashed focus:border-blue-500 sm:text-3xl"
          />
        )}
        {props.updateResultStatus.data?.result === "incorrect" && (
          <>
            <div
              className={
                "flex justify-center items-center py-[23px] block w-full   text-center border-2 border-gray-200 border-dashed rounded-md shadow-sm focus:border-dashed focus:border-blue-500 sm:text-6xl bg-white"
              }
            >
              <span className="text-red-600 line-through">
                <span className={"text-gray-900"}>{props.submittedAnswer}</span>
              </span>
              <div className={"ml-5 text-red-600 font-normal"}>
                {` ${props.updateResultStatus.data.output}`}
              </div>
            </div>
          </>
        )}
      </div>
    </form>
  );
}

ViewerInput.propTypes = {
  onSubmit: PropTypes.func,
  updateResultStatus: PropTypes.any,
  register: PropTypes.any,
  submittedAnswer: PropTypes.string,
};
