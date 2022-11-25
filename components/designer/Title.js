import React from "react";
import {AcademicCapIcon, BuildingLibraryIcon} from "@heroicons/react/24/outline";

export function Title({ title }) {
  return (
    <div className={'flex items-center py-2 '}>

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
