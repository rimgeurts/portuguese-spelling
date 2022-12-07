import { LinkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";

export function QuizLink({ quizId }) {
  const [isCopied, setIsCopied] = useState(false);
  const onCopyLink = async (event) => {
    event.preventDefault();
    setIsCopied(true);
    const quizLink = event.target[0].value;
    await navigator.clipboard.writeText(quizLink);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }, [isCopied]);

  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        Quiz link
      </label>
      <form className="mt-1 relative" onSubmit={onCopyLink}>
        <input
          type="email"
          name="email"
          id="email"
          disabled
          className="py-3 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 cursor-text  disabled:border-gray-200  disabled:text-gray-500 sm:text-sm"
          placeholder="you@example.com"
          value={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/quiz/${quizId}`}
        />
        <div className="flex gap-1 absolute inset-y-0 right-0 flex py-1.5 pr-1.5 ">
          {/*<button*/}
          {/*  onClick={() =>*/}
          {/*    navigator.clipboard.writeText("Copy this text to clipboard")*/}
          {/*  }*/}
          {/*  type="button"*/}
          {/*  className="inline-flex items-center rounded border border-transparent bg-blue-100 px-2.5 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"*/}
          {/*>*/}
          {/*  {"<>"} Embed*/}
          {/*</button>*/}
          <button
            type="submit"
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <LinkIcon className={"h-4 w-4"} />
            <div className={"text-xs ml-1 font-semibold"}>
              {isCopied ? "Copied!" : "Copy"}
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}
