import React, { useEffect, useState } from "react";
import useAddNewQuestion from "./hooks/useAddNewQuestion";

function AddNewQuestionButtonPlusIcon({ icon }) {
  const { handleClick } = useAddNewQuestion();

  return (
      <button
          id={'add-new-question-button'}
          onClick={handleClick}
          type="button"
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        New Question
      </button>
  );
}

export default AddNewQuestionButtonPlusIcon;
