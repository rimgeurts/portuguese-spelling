import React from "react";

export function SubTitle({title}) {
    return (
        <div
            className={
                "text-md text-gray-800 font-semibold flex justify-center py-2  mb-2 rounded-md"
            }
        >
            {title}
        </div>
    );
}