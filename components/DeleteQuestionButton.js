import React, { useEffect, useState } from "react";
import { PlayCircleIcon } from "@heroicons/react/20/solid";
import {
  PlusCircleIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  useAddBlankQuestionMutation,
  useDeleteAnswerMutation,
  useDeleteQuestionMutation,
  useGetQuizByIdQuery,
} from "../redux/apis/strapi";
import { useDispatch, useSelector } from "react-redux";
import { selectUI, updateUIState } from "../redux/slices/uiSlice";

function AddNewQuestionButton(props) {
  const dispatch = useDispatch();
  const [addNewQuiz, setAddNewQuiz] = useState(false);
  const [isQuestionDeleted, setIsQuestionDeleted] = useState(false);
  const [response, setResponse] = useState(null);
  const [deleteQuestionStrapi, deleteQuestionStrapiStatus] =
    useDeleteQuestionMutation();
  const [deleteAnswerStrapi, deleteAnswerStrapiStatus] =
    useDeleteAnswerMutation();
  const {
    selectedQuizId,
    answers,
    activeQuestionId,
    activeAnswerId,
    activeQuestionIndex,
  } = useSelector(selectUI);

  const { data: quiz } = useGetQuizByIdQuery(
    { selectedQuizId },
    { skip: !selectedQuizId }
  );

  const getActiveQuestionIndex = () => {
    const questionsArray = quiz.attributes.questions.data;
    const totalNoQuestions = questionsArray.length - 1;
    if (activeQuestionIndex > totalNoQuestions) {
      return totalNoQuestions;
    }
    return activeQuestionIndex;
  };

  useEffect(() => {
    console.log({ quiz });
    if (!isQuestionDeleted) {
      return;
    }
    const questionIndex = getActiveQuestionIndex();

    dispatch(
      updateUIState({
        activeQuestionId:
          quiz.attributes.questions.data[questionIndex].id,
        activeQuestionIndex: questionIndex,
        activeAnswerId:
          quiz.attributes.questions.data[questionIndex].attributes.answers
            .data[0].id,
      })
    );
    setIsQuestionDeleted(false);
  }, [quiz]);

  const handleClick = async () => {
    const payloadQuestion = {
      id: activeQuestionId,
    };
    await deleteQuestionStrapi(payloadQuestion);

    const payloadAnswer = {
      id: activeAnswerId,
    };
    setIsQuestionDeleted(true);
    await deleteAnswerStrapi(payloadAnswer);
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`bg-white hover:bg-gray-50 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 relative -ml-px inline-flex items-center border border-gray-300 px-4 py-4 text-sm font-medium text-gray-500`}
    >
      <span className="sr-only">Delete Question</span>
      <TrashIcon className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}

export default AddNewQuestionButton;
