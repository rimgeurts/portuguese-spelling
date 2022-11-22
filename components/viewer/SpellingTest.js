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
import { ViewerHeader } from "./ViewerHeader";
import { ViewerResults } from "./ViewerResults";
import { ViewerInput } from "./ViewerInput";
import ViewerControlButtons from "./ViewerControlButtons";
import ViewerFinishScreen from "./ViewerFinishScreen";
import { ViewerCloseButton } from "./ViewerCloseButton";
import useOnClickOutside from "../hooks/useClickOutside";
import ConfirmationModal from "../ui/ConfirmationModal";

function SpellingTest() {
  const [audio, setAudio] =  useState(null);
  const nextButtonRef = useRef();
  const quizViewerRef = useRef();
  const router = useRouter();
  const quizId = router.query.id;
  const [openFinishScreen, setOpenFinishScreen] = useState(false);
  const [submittedAnswer, setSubmittedAnswer] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [openLeaveQuizDialog, setOpenLeaveQuizDialog] = useState(false);
  const query = generateGetAllQuestionsQuery(quizId, pageNumber);
  const { activeQuizResultsId } = useSelector(selectUI);

  useOnClickOutside(quizViewerRef, (e) => {
    const HtmlHeader = document.getElementById("quiz-viewer-header");
    if (HtmlHeader.contains(e.target)) {
      setOpenLeaveQuizDialog(true);
    }
  });

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
  const specialCharacters = questions?.data[0].attributes.quiz.data.attributes.translate_to.data.attributes.accentCodes.data;

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    console.log({questions})
  }, [questions])

  const onSubmit = async (data) => {
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

    // TODO: 'Add Audio support when clicking submit'

    // audio.currentTime = 0;
    // audio.loop = false;
    // audio.play();
    nextButtonRef.current.focus();
  };

  // TODO: 'Add Audio support when clicking submit'
  useEffect(() => {
 //   setAudio(new Audio('https://protected-plateau-64458.herokuapp.com/uploads/correct_Answer_b037db8b71.mp3'));
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setFocus("answerInput");
    }, 200);
    return () => clearTimeout(timer);

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
    <div ref={quizViewerRef} className={"relative"}>
      <ConfirmationModal
        title={"Leave Quiz?"}
        action={() => router.push("/quizlist")}
        open={openLeaveQuizDialog}
        setOpen={setOpenLeaveQuizDialog}
        confirmationButtonName={"Leave"}
      >
        Are you sure you want to leave this quiz?
      </ConfirmationModal>
      <ViewerFinishScreen
        results={results}
        questions={questions}
        open={openFinishScreen}
        setOpen={setOpenFinishScreen}
      />
      <div className={"p-4"}>
        <div className={"mx-auto max-w-7xl sm:px-6 lg:px-8 "}>
          <ViewerCloseButton />
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
            {specialCharacters && specialCharacters.map(
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
            onClickNextButton={onLoadNextQuestion}
            onClickSubmitButton={handleSubmit(onSubmit)}
          />
        </div>
      </div>
    </div>
  );
}

export default SpellingTest;
