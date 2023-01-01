import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import React from "react";

export function FormInfoMessage({ message }) {
  return (
    <div
      className={"flex items-center text-gray-600 font-semibold text-xs mt-1"}
    >
      <ExclamationTriangleIcon className={"w-4 h-4"} />
      <span className={"ml-1"}>{message}</span>
    </div>
  );
}
