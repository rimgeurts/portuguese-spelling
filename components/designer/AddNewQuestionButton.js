import React, { useEffect, useState } from "react";
import useAddNewQuestion from "./hooks/useAddNewQuestion";

function AddNewQuestionButtonPlusIcon({ icon }) {
  const { handleClick } = useAddNewQuestion();

  return (
      <button
          onClick={handleClick}
          type="button"
          className=" inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add Question
      </button>
  );
}

export default AddNewQuestionButtonPlusIcon;
