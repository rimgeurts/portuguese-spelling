import React from "react";
import * as PropTypes from "prop-types";

export function ViewerHeader(props) {
    return (
        <div
            className={
                "flex justify-between border-b-2 border-dashed border-gray-200"
            }
        >
            <div
                className={`sm:px-0 sm:py-3 px-3 py-1 rounded-md  sm:text-2xl text-lg  text-gray-400  `}
            >
                {/*Score:{" 100%"}*/}
            </div>

            <div
                className={`sm:px-0 sm:py-3 px-3 py-1 rounded-md  sm:text-2xl text-lg  text-gray-400  `}
            >
                Question: {props.currentQuestionNo} / {props.totalQuestions}
            </div>
        </div>
    );
}

ViewerHeader.propTypes = {
    currentQuestionNo: PropTypes.any,
    totalQuestions: PropTypes.any,
};