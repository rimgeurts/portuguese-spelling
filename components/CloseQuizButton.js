import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetQuizByIdQuery,
  useUpdateAnswerMutation,
  useUpdateQuestionMutation,
} from "../redux/apis/strapi";
import {
  selectUI,
  updateHasActiveQuestionChanged,
} from "../redux/slices/uiSlice";
import Link from "next/link";

export function CloseQuizButton() {
  const dispatch = useDispatch();
  const [updateQuestionStrapi, updateQuestionStrapiStatus] =
    useUpdateQuestionMutation();
  const [updateAnswerStrapi, updreduxAnswerapiStatus] =
    useUpdateAnswerMutation();
  const {
    selectedQuizId,
    activeQuestionId,
    activeAnswerId,
    activeQuestionIndex,
    activeAnswerIndex,
    hasActiveQuestionChanged,
    answers: inputAnswer,
    question: inputQuestion,
  } = useSelector(selectUI);
  const {
    data: quiz,
    error,
    isLoading,
  } = useGetQuizByIdQuery({ selectedQuizId }, { skip: !selectedQuizId });
  const question = quiz?.attributes.questions.data[activeQuestionIndex];

  const uploadQuestionToStrapi = () => {
    const payload = {
      id: activeQuestionId,
      data: {
        title: inputQuestion,
        quiz: [selectedQuizId],
      },
    };
    updateQuestionStrapi(payload);
  };
  const uploadAnswerToStrapi = () => {
    const payload = {
      id: activeAnswerId,
      data: {
        title: inputAnswer[activeAnswerIndex].attributes.title,
        quiz: [selectedQuizId],
        question: [activeQuestionId],
      },
    };
    updateAnswerStrapi(payload);
  };

  const handleOnClickSave = () => {
    if (!hasActiveQuestionChanged) {
      return;
    }
    uploadQuestionToStrapi();
    uploadAnswerToStrapi();
    dispatch(
      updateHasActiveQuestionChanged({ hasActiveQuestionChanged: false })
    );
  };

  return (
      <>
    <Link href={"./quizlist"} >
      <button
        onClick={handleOnClickSave}
        type="submit"
        className="inline-flex items-center justify-center sm:px-4 px-3 sm:py-2 py-2  sm:text-lg sm:font-medium text-white bg-pink-600 border border-transparent rounded-md shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
      >
        <ArrowDownTrayIcon className="block h-6 w-6 mr-1" aria-hidden="true" />
        <div className={''}>Close</div>
      </button>
    </Link>
      </>
  );
}
