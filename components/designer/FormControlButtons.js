import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUI,
  updateActiveAnswerId,
  updateActiveAnswerIndex,
  updateActiveQuestionId,
  updateActiveQuestionIndex,
  updateHasActiveQuestionChanged,
  updateUIState,
} from "../../redux/slices/uiSlice";
import {
  useGetQuizByIdQuery,
  useUpdateAnswerMutation,
  useUpdateQuestionMutation,
} from "../../redux/apis/strapi";
import { useFormContext } from "react-hook-form";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import AddNewQuestionButtonPlusIcon from "./AddNewQuestionButtonPlusIcon";
import DeleteQuestionButton from "./DeleteQuestionButton";

export function FormControlButtons() {
  const dispatch = useDispatch();
  const [initialRender, setInitialRender] = useState(true);
  const [lastIndexWarning, setLastIndexWarning] = useState(false);
  const [firstIndexWarning, setFirstIndexWarning] = useState(true);
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
  const totalQuestions = quiz?.attributes.questions.data.length - 1;
  const answers = question?.attributes.answers.data;
  const { handleSubmit } = useFormContext();

  useEffect(() => {
    if (!quiz) {
      return;
    }

    if (totalQuestions === 0) {
      setLastIndexWarning(true);
      setFirstIndexWarning(true);
      return;
    }

    setLastIndexWarning(false);
    setFirstIndexWarning(false);

    if (activeQuestionIndex + 1 > totalQuestions) {
      setLastIndexWarning(true);
    }

    if (activeQuestionIndex - 1 < 0) {
      setFirstIndexWarning(true);
    }
    console.log({ activeQuestionIndex, totalQuestions });
  }, [activeQuestionIndex, selectedQuizId, quiz]);

  const loadQuestion = (questionIndex) => {
    if (!quiz) {
      return;
    }
    if (questionIndex + 1 > quiz.attributes.questions.data.length) {
      return;
    }
    if (questionIndex + 1 <= 0) {
      return;
    }

    dispatch(
      updateUIState({
        activeQuestionId: quiz.attributes.questions.data[questionIndex].id,
        activeQuestionIndex: questionIndex,
        activeAnswerId:
          quiz.attributes.questions.data[questionIndex].attributes.answers
            .data[0].id,
      })
    );
  };

  useEffect(() => {
    if (!quiz) {
      return;
    }
    if (initialRender) {
      loadQuestion(activeQuestionIndex);
      setInitialRender(false);
    }
  }, [quiz]);

  const handleOnClickNext = () => {
    loadQuestion(activeQuestionIndex + 1);
    if (hasActiveQuestionChanged) {
      dispatch(
        updateHasActiveQuestionChanged({ hasActiveQuestionChanged: false })
      );
    }
  };

  const handleOnClickPrevious = () => {
    loadQuestion(activeQuestionIndex - 1);
    if (hasActiveQuestionChanged) {
      dispatch(
        updateHasActiveQuestionChanged({ hasActiveQuestionChanged: false })
      );
    }
  };

  return (
    <>
      <span className="isolate inline-flex rounded-md shadow-sm">
        <button
          onClick={() => loadQuestion(0)}
          type="button"
          className={`${
            firstIndexWarning
              ? "bg-gray-100 cursor-not-allowed"
              : "bg-white hover:bg-gray-50 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          } relative -ml-px inline-flex items-center rounded-l-md border-l border-t border-b border-gray-300 px-4 py-4 text-sm font-medium text-gray-500`}
        >
          <span className="sr-only">Next</span>
          <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          onClick={handleOnClickPrevious}
          type="button"
          className={`${
            firstIndexWarning
              ? "bg-gray-100 cursor-not-allowed"
              : "bg-white hover:bg-gray-50 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          } relative inline-flex items-center  border border-gray-300 px-4 py-4 text-sm font-medium text-gray-500`}
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <DeleteQuestionButton />
        <AddNewQuestionButtonPlusIcon  />
        <button
          onClick={handleOnClickNext}
          type="button"
          className={`${
            lastIndexWarning
              ? "bg-gray-100 cursor-not-allowed"
              : "bg-white hover:bg-gray-50 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          } relative -ml-px inline-flex items-center border border-gray-300 px-4 py-4 text-sm font-medium text-gray-500`}
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          onClick={() => loadQuestion(totalQuestions)}
          type="button"
          className={`${
            lastIndexWarning
              ? "bg-gray-100 cursor-not-allowed"
              : "bg-white hover:bg-gray-50 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          } relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 px-4 py-4 text-sm font-medium text-gray-500`}
        >
          <span className="sr-only">Next</span>
          <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </span>
    </>
  );
}
