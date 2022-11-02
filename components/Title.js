import React from "react";

export function Title({ title }) {
  return (
    <div
      className={
        "text-2xl text-gray-800 font-semibold flex justify-center py-2  mb-4 rounded-md"
      }
    >
      {title}
    </div>
  );
}
