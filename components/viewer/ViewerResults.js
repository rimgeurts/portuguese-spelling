import React from "react";
import * as PropTypes from "prop-types";

export function ViewerResults(props) {
    return (
        <div className={"sm:text-6xl text-4xl font-semibold"}>
            <div className="text-gray-900">{props.question?.attributes.title}</div>
            {props.updateResultStatus.data?.result === "correct" && (
                <div
                    className={
                        " flex items-center justify-center px-4 py-2 bg-green-50 text-green-600  rounded-md text-base"
                    }
                >
                    Correct!
                </div>
            )}
            {props.updateResultStatus.data?.result === "incorrect" && (
                <div
                    className={
                        "flex items-center justify-center px-4 py-2 bg-red-50 text-red-600  rounded-md text-base"
                    }
                >
                    Incorrect!
                </div>
            )}
            {!props.updateResultStatus.data?.result && (
                <div
                    className={
                        "flex items-center justify-center h-10 w-28 bg-red-50 text-red-700 rounded-md border-2 text-base bg-transparent border-transparent text-transparent"
                    }
                >
                    no data
                </div>
            )}{" "}
        </div>
    );
}

ViewerResults.propTypes = {
    question: PropTypes.any,
    updateResultStatus: PropTypes.any,
};