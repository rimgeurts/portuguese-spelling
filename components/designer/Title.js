import React from "react";
import {AcademicCapIcon, BuildingLibraryIcon} from "@heroicons/react/24/outline";

export function Title({ title }) {
  return (
    <div className={'text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight '}>

      <div
        className={
          "text-2xl text-gray-800  flex justify-center rounded-md"
        }
      >
        {title}
      </div>

    </div>
  );
}
