import React, { useEffect, useState } from "react";
import { PlayCircleIcon } from "@heroicons/react/20/solid";
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/24/outline";

import {useDispatch, useSelector} from "react-redux";
import {selectUI, updateUIState} from "../../../redux/slices/uiSlice";
import {useAddBlankQuestionMutation, useGetQuizByIdQuery} from "../../../redux/apis/strapi";

export default function useAddNewQuestion() {
  const dispatch = useDispatch();
  const [addNewQuestion, setAddNewQuestion] = useState(false);
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
    if (!addNewQuestion) {
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
    setAddNewQuestion(false);
  }, [quiz]);

  const handleClick = async () => {
    const payloadQuestion = {
      data: {
        quizId: selectedQuizId,
      },
    };
    setAddNewQuestion(true);
    const response = await addNewBlankQuestion(payloadQuestion);
    setResponse(response);
    console.log({ response });
  };

  return { handleClick };
}

