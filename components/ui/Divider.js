import React from "react";

export function Divider({ title }) {
  return (
    <div className="relative bg-white my-6">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300"></div>
      </div>
      <div className="relative flex justify-center">
        <span className={` px-2 text-xs text-gray-900 bg-white rounded-md`}>
          {title}
        </span>
      </div>
    </div>
  );
}
