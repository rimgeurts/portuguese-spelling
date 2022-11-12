import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUI, updateQuizTitle } from "../redux/slices/uiSlice";
import {
  useGetQuizByIdQuery,
  useUpdateQuizMutation,
} from "../redux/apis/strapi";

export function QuizSettings() {
  const dispatch = useDispatch();
  const { selectedQuizId, quizTitle } = useSelector(selectUI);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [updateQuiz, updateQuizResults] = useUpdateQuizMutation();
  const {
    data: quiz,
    error,
    isLoading,
  } = useGetQuizByIdQuery({ selectedQuizId }, { skip: !selectedQuizId });

  useEffect(() => {
    if (!quiz) {
      return;
    }
    quiz.attributes.title &&
      dispatch(updateQuizTitle({ quizTitle: quiz.attributes.title }));
  }, [quiz]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSubmitButton(false);
    const payload = {
      id: selectedQuizId,
      data: {
        title: quizTitle
      },
    }
    updateQuiz(payload);
  };

  return (
    <form onSubmit={handleSubmit} className={""}>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        Quiz Title
      </label>
      <div className="mt-1 flex gap-2">
        <input
          autoComplete="off"
          onClick={() => setShowSubmitButton(true)}
          type="text"
          name="text"
          id="text"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder=""
          value={quizTitle}
          onChange={(e) =>
            dispatch(updateQuizTitle({ quizTitle: e.target.value }))
          }
        />
        {showSubmitButton && (
          <button
            type="submit"
            className="inline-flex items-center rounded border border-transparent bg-blue-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        )}
      </div>
    </form>
  );
}
