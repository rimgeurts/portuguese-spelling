import React from "react";
import {AcademicCapIcon, BuildingLibraryIcon} from "@heroicons/react/24/outline";

export function Title({ title }) {
  return (
    <div className={'flex items-center py-2 '}>
        <div className={'text-gray-500 w-10 h-10  mr-4'}>
            <img src="./feather-gray.svg" alt="" srcSet=""/>
        </div>
      <div
        className={
          "text-2xl text-gray-900 font-semibold flex justify-center rounded-md"
        }
      >
        {title}
      </div>

    </div>
  );
}
