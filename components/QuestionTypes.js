import {PlusIcon} from "@heroicons/react/24/outline";
import React from "react";

export default function QuestionTypes() {
    return (
        <div className={'flex gap-2 flex-wrap my-4'}>

            <button
                type="submit"
                className=" inline-flex items-center sm:px-4 px-3 sm:py-2 py-2  sm:text-lg sm:font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                <PlusIcon className="block h-4 w-4 mr-1" aria-hidden="true" />
                Multiple
            </button>
            <button
                type="submit"
                className="inline-flex items-center sm:px-4 px-3 sm:py-2 py-2  sm:text-lg sm:font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                <PlusIcon className="block h-4 w-4 mr-1" aria-hidden="true" />
                Single
            </button>
            <button
                type="submit"
                className="inline-flex items-center sm:px-4 px-3 sm:py-2 py-2  sm:text-lg sm:font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                <PlusIcon className="block h-4 w-4 mr-1" aria-hidden="true" />
                Essay
            </button>
            <button
                type="submit"
                className=" inline-flex items-center sm:px-4 px-3 sm:py-2 py-2  sm:text-lg sm:font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                <PlusIcon className="block h-4 w-4 mr-1" aria-hidden="true" />
                Translation
            </button>
        </div>
    );
}