import React, { useEffect, useRef, useState } from "react";
import {
  useGetAllQuestionsForQuizQuery,
  useGetResultsByIdQuery,
  useUpdateResultsByIdMutation,
} from "../../redux/apis/strapi";
import { useRouter } from "next/router";
import { generateGetAllQuestionsQuery } from "../util/generateGetAllQuestionsQuery";
import { getSpecialCharacters } from "../util/getSpecialCharacters";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectUI } from "../../redux/slices/uiSlice";
import * as PropTypes from "prop-types";
import { ViewerHeader } from "./ViewerHeader";
import { ViewerResults } from "./ViewerResults";
import { ViewerInput } from "./ViewerInput";
import ViewerControlButtons from "./ViewerControlButtons";
import ViewerFinishScreen from "./ViewerFinishScreen";

function SpellingTest() {
  const nextButtonRef = useRef();
  const router = useRouter();
  const quizId = router.query.id;
  const [openFinishScreen, setOpenFinishScreen] = useState(false);
  const [submittedAnswer, setSubmittedAnswer] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const query = generateGetAllQuestionsQuery(quizId, pageNumber);
  const specialCharacters = getSpecialCharacters();
  const { activeQuizResultsId } = useSelector(selectUI);

  const {
    data: questions,
    error,
    isLoading,
  } = useGetAllQuestionsForQuizQuery({ query }, { skip: !quizId });

  const { data: results } = useGetResultsByIdQuery(
    { id: activeQuizResultsId },
    { skip: !activeQuizResultsId }
  );
  const [updateResults, updateResultStatus] = useUpdateResultsByIdMutation();
  const currentQuestionNo = questions?.meta.pagination.page;
  const totalQuestions = questions?.meta.pagination.total;
  const question = questions?.data[0];
  const answer = question?.attributes.answers.data[0];
  console.log({ questions });

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("SUBMITTING QUESTION");
    const payload = {
      id: activeQuizResultsId,
      data: {
        questionId: question.id,
        answerId: answer.id,
        answerInput: data.answerInput,
      },
    };
    await updateResults(payload);
    setSubmittedAnswer(data.answerInput);
    nextButtonRef.current.focus();
  };

  useEffect(() => {
    console.log({ updateResultStatus });
  }, [updateResultStatus]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFocus("answerInput");
    }, 200);
    return () => clearTimeout(timer);
    setFocus("answerInput");
  }, [pageNumber]);

  const onLoadNextQuestion = () => {
    if (pageNumber + 1 > totalQuestions) {
      setOpenFinishScreen(true);
      return;
    }
    setPageNumber((prevPage) => prevPage + 1);
    updateResultStatus.reset();
    reset();
  };

  const handleAddSpecialCharacter = (specialCharacter) => {
    setAnswer((prevAnswer) => prevAnswer.concat(specialCharacter));
  };

  return (
    <>
      <ViewerFinishScreen
        results={results}
        questions={questions}
        open={openFinishScreen}
        setOpen={setOpenFinishScreen}
      />
      <div className={"p-4"}>
        <div className={"mx-auto max-w-7xl sm:px-6 lg:px-8"}>
          <ViewerHeader
            currentQuestionNo={currentQuestionNo}
            totalQuestions={totalQuestions}
          />
          <div className="flex flex-col items-center justify-center mt-6">
            <ViewerResults
              question={question}
              updateResultStatus={updateResultStatus}
            />
          </div>
          <ViewerInput
            onSubmit={handleSubmit(onSubmit)}
            updateResultStatus={updateResultStatus}
            register={register("answerInput")}
            submittedAnswer={submittedAnswer}
          />
          <div
            className={
              "sm:text-4xl text-2xl flex sm:gap-2 gap-1 justify-center mt-4 flex-wrap"
            }
          >
            {specialCharacters.map(
              (specialCharacter, specialCharacterIndex) => {
                return (
                  <div
                    onClick={() => handleAddSpecialCharacter(specialCharacter)}
                    className={
                      "sm:w-[50px] sm:p-2 p-1 w-[30px] border-2 border-blue-500 rounded-md bg-blue-100 text-blue-500 text-center hover:bg-blue-200 cursor-pointer select-none"
                    }
                    key={specialCharacter}
                  >
                    {specialCharacter}
                  </div>
                );
              }
            )}
          </div>
          <ViewerControlButtons
            updateResultStatus={updateResultStatus}
            ref={nextButtonRef}
            onClick={onLoadNextQuestion}
            onClick1={handleSubmit(onSubmit)}
          />
        </div>
      </div>
    </>
  );
}

export default SpellingTest;
