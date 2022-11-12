import React from "react";

export function Divider({ title, backgroundColor = "bg-white" }) {
  return (
    <div className={`relative ${backgroundColor}  py-4`}>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300"></div>
      </div>

      {title && (
        <div className="relative flex justify-center">
          <span
            className={` px-2 text-xs text-gray-900 ${backgroundColor} rounded-md`}
          >
            {title}
          </span>
        </div>
      )}
    </div>
  );
}
