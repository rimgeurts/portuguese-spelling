import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUI,
  updateSelectedQuizId,
  updateQuestionId,
} from "../redux/slices/uiSlice";
import {
  useAddAnswerMutation,
  useAddQuestionMutation,
  useAddQuizMutation,
  useGetQuizByIdQuery,
} from "../redux/apis/strapi";
import Link from "next/link";

export function CreateQuizButton() {
  const { selectedQuizId, quizTitle } = useSelector(selectUI);
  const [addNewQuiz, addNewQuizResponse] = useAddQuizMutation();
  const [addNewAnswer, addNewAnswerResponse] = useAddAnswerMutation();
  const [addNewQuestion, addNewQuestionResponse] = useAddQuestionMutation();
  const dispatch = useDispatch();


  useEffect(() => {
    if (addNewQuizResponse?.isSuccess) {
      dispatch(
        updateSelectedQuizId({
          selectedQuizId: addNewQuizResponse.data.data.id,
        })
      );
    }
  }, [addNewQuizResponse]);

  const handleCreateNewQuiz = async () => {
    const addQuizResponse = await addNewQuiz({ data: {} });
    const addQuestionResponse = await addNewQuestion({
      data: {
        quiz: [addQuizResponse.data.data.id],
      },
    });
    await addNewAnswer({
      data: {
        quiz: [addQuizResponse.data.data.id],
        question: [addQuestionResponse.data.data.id]
      },
    });
    // dispatch(updateQuestionId({questionId: addQuestionResponse.data.data.id}))
  };

  return (
    <Link href={"/create"}>
      <button
        onClick={handleCreateNewQuiz}
        type="submit"
        className="sm:mr-4 inline-flex items-center sm:px-4 px-3 sm:py-2 py-2 my-2 sm:text-lg sm:font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <PlusIcon className="block h-6 w-6 mr-2" aria-hidden="true" />
        Create
      </button>
    </Link>
  );
}
