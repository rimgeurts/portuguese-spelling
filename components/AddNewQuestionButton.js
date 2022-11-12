import React, { useEffect, useState } from "react";
import { PlayCircleIcon } from "@heroicons/react/20/solid";
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import {
  useAddBlankQuestionMutation,
  useGetQuizByIdQuery,
} from "../redux/apis/strapi";
import { useDispatch, useSelector } from "react-redux";
import { selectUI, updateUIState } from "../redux/slices/uiSlice";

function AddNewQuestionButton(props) {
  const dispatch = useDispatch();
  const [addNewQuiz, setAddNewQuiz] = useState(false);
  const [response, setResponse] = useState(null);
  const [addNewBlankQuestion, addNewBlankQuestionResponse] =
    useAddBlankQuestionMutation();
  const { selectedQuizId, answers } = useSelector(selectUI);
  const { data: quiz } = useGetQuizByIdQuery(
    { selectedQuizId },
    { skip: !selectedQuizId }
  );

  // Wait for the quiz to be updated with the recently added blank Question before updating the state
  useEffect(() => {
    if (!addNewQuiz) {
      return;
    }
    dispatch(
      updateUIState({
        activeQuestionId: response.data.data?.questionId,
        activeQuestionIndex: response.data.data?.questionArrayIndex,
        activeAnswerId: response.data.data?.answerId,
        activeAnswerIndex: 0,
      })
    );
    setAddNewQuiz(false);
  }, [quiz]);

  const handleClick = async () => {
    const payloadQuestion = {
      data: {
        quizId: selectedQuizId,
      },
    };
    setAddNewQuiz(true);
    const response = await addNewBlankQuestion(payloadQuestion);
    setResponse(response);
    console.log({ response });
  };

  return (
      <button
          onClick={handleClick}
          type="button"
          className={`bg-white hover:bg-gray-50 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 relative -ml-px inline-flex items-center border border-gray-300 px-4 py-4 text-sm font-medium text-gray-500`}
      >
        <span className="sr-only">Add New Question</span>
        <PlusIcon className="h-5 w-5" aria-hidden="true" />
      </button>
  );
}

export default AddNewQuestionButton;
