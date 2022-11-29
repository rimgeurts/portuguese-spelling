import {LinkIcon} from "@heroicons/react/24/outline";
import React from "react";

export function QuizLink() {
    return (
        <div>
            <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
            >
                Quiz link
            </label>
            <div className="mt-1 relative">
                <input
                    type="email"
                    name="email"
                    id="email"
                    disabled
                    className="py-3 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 cursor-text  disabled:border-gray-200  disabled:text-gray-500 sm:text-sm"
                    placeholder="you@example.com"
                    value={"https://localhost.com/quiz/2008"}
                />
                <div className="flex gap-1 absolute inset-y-0 right-0 flex py-1.5 pr-1.5 ">
                    <button
                        type="button"
                        className="inline-flex items-center rounded border border-transparent bg-blue-100 px-2.5 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        {"<>"} Embed
                    </button>
                    <button
                        type="button"
                        className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        <LinkIcon className={"h-5 w-5"}/>
                        <div className={"text-xs ml-1 font-semibold"}>Copy</div>
                    </button>
                </div>
            </div>
        </div>
    );
}