import React, { useEffect, useState } from "react";
import useAddNewQuestion from "./hooks/useAddNewQuestion";
import { PlusIcon } from "@heroicons/react/24/outline";

function AddNewQuestionButtonPlusIcon({ icon }) {
  const { handleClick } = useAddNewQuestion();

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`bg-white hover:bg-gray-50 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 relative -ml-px inline-flex items-center border border-gray-300 px-4 py-4 text-sm font-medium text-gray-500`}
    >
      <span className="sr-only">Add New Question</span>
      <PlusIcon className="h-5 w-5 " aria-hidden="true" />
    </button>
  );
}

export default AddNewQuestionButtonPlusIcon;
