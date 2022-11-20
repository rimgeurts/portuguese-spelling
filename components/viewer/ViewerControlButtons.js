import React, {forwardRef} from "react";

const ViewerControlButtons = forwardRef((props, ref) => {
    ViewerControlButtons.displayName = 'ViewerControlButtons'
    return (
        <div className="flex justify-center sm:mt-10 mt-10">
            {props.updateResultStatus.isSuccess ? (
                <button
                    ref={ref}
                    onClick={props.onClick}
                    className="inline-flex items-center sm:px-6 px-3 sm:py-3 py-2 my-2 sm:text-xl sm:font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Next
                </button>
            ) : (
                <button
                    onClick={props.onClick1}
                    className="inline-flex items-center sm:px-6 px-3 sm:py-3 py-2 my-2 sm:text-xl sm:font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    {props.updateResultStatus.isLoading && (
                        <div className="w-4 h-4 border-b-2 border-white rounded-full animate-spin mr-3"></div>
                    )}
                    <div>Submit</div>
                </button>
            )}
        </div>
    );
})

export default ViewerControlButtons;

// ViewerControlButtons.propTypes = {
//     updateResultStatus: PropTypes.any,
//     ref: PropTypes.any,
//     onClick: PropTypes.func,
//     onClick1: PropTypes.func,
// };
