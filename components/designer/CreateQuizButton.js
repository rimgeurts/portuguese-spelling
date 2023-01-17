import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddBlankQuestionMutation,
  useAddQuizMutation,
  useGetQuizByIdQuery,
} from "../../redux/apis/strapi";
import {
  selectUI,
  updateSelectedQuizId,
  updateUIState,
} from "../../redux/slices/uiSlice";

export function CreateQuizButton({ tailwindClass }) {
  const router = useRouter();
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
    { selectedQuizId: router.query.id },
    { skip: !router.query.id }
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
    if (!session) {
      return;
    }
    const addQuizResponse = await addNewQuiz({ data: {} });

    const payloadQuestion = {
      data: {
        quizId: addQuizResponse.data.id,
      },
    };
    setAddNewQuestion(true);
    const response = await addNewBlankQuestion(payloadQuestion);
    setResponse(response);
    dispatch(updateSelectedQuizId({ selectedQuizId: addQuizResponse.data.id }));
    await router.push(`/create/${addQuizResponse.data.id}`);
  };

  return (
    //  <Link href={"/create"}>
    <button
      onClick={handleCreateNewQuiz}
      type="submit"
      className="whitespace-nowrap inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-3 text-sm font-medium leading-4 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      Create New Quiz
    </button>
    // </Link>
  );
}
