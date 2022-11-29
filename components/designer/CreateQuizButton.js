import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUI,
  updateSelectedQuizId,
  updateQuestionId,
  updateUIState,
} from "../../redux/slices/uiSlice";
import {
  useAddAnswerMutation, useAddBlankQuestionMutation,
  useAddQuestionMutation,
  useAddQuizMutation,
  useGetQuizByIdQuery,
} from "../../redux/apis/strapi";
import Link from "next/link";
import {useSession} from "next-auth/react";

export function CreateQuizButton() {
  const { data: session, status } = useSession();
  const { selectedQuizId, quizTitle } = useSelector(selectUI);
  const [addNewQuiz, addNewQuizStatus] = useAddQuizMutation();
  const [addNewQuestion, setAddNewQuestion] = useState(false);
  const [newQuizId, setNewQuizId] = useState(null);
  const [response, setResponse] = useState(null);
  const [addNewBlankQuestion, addNewBlankQuestionStatus] =
      useAddBlankQuestionMutation();
  const dispatch = useDispatch();

  const { data: quiz } = useGetQuizByIdQuery(
      { selectedQuizId },
      { skip: !selectedQuizId }
  );

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

  const handleCreateNewQuiz = async () => {
    if(!session) {
      return;
    }
    const addQuizResponse = await addNewQuiz({ data: {} });
    // const addQuestionResponse = await addNewQuestion({
    //   data: {
    //     quiz: [addQuizResponse.data.data.id],
    //   },
    // });
    // await addNewAnswer({
    //   data: {
    //     quiz: [addQuizResponse.data.data.id],
    //     question: [addQuestionResponse.data.data.id],
    //   },
    // });


    const payloadQuestion = {
      data: {
        quizId: addQuizResponse.data.id,
      },
    };
    setAddNewQuestion(true);
    const response = await addNewBlankQuestion(payloadQuestion);
    setResponse(response);
    dispatch(
        updateSelectedQuizId({selectedQuizId: addQuizResponse.data.id})
    );
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
