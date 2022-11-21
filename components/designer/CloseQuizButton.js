import {
  ArrowDownTrayIcon,
  BackwardIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetQuizByIdQuery,
  useUpdateAnswerMutation,
  useUpdateQuestionMutation,
} from "../../redux/apis/strapi";
import {
  resetUIState,
  selectUI,
  updateHasActiveQuestionChanged,
} from "../../redux/slices/uiSlice";
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

  const handleClick = () => {
    dispatch(resetUIState());
  };

  return (
    <>
      <Link href={"./quizlist"}>
        <button
          onClick={handleClick}
          type="button"
          className=" inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save & Exit
        </button>
      </Link>
    </>
  );
}
