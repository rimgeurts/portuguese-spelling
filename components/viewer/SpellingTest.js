import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  useGetAllQuestionsForQuizQuery,
  useGetResultsByIdQuery,
  useUpdateResultsByIdMutation,
} from "../../redux/apis/strapi";
import { selectUI } from "../../redux/slices/uiSlice";
import useOnClickOutside from "../hooks/useClickOutside";
import ConfirmationModal from "../ui/ConfirmationModal";
import { generateGetAllQuestionsQuery } from "../util/generateGetAllQuestionsQuery";
import AccentKeyboard from "./AccentKeyboard";
import { ViewerCloseButton } from "./ViewerCloseButton";
import ViewerControlButtons from "./ViewerControlButtons";
import ViewerFinishScreen from "./ViewerFinishScreen";
import { ViewerHeader } from "./ViewerHeader";
import { ViewerInput } from "./ViewerInput";
import { ViewerResults } from "./ViewerResults";

function SpellingTest() {
  const [audio, setAudio] = useState(null);
  const nextButtonRef = useRef();
  const quizViewerRef = useRef();
  const router = useRouter();
  const quizId = router.query.id;
  const [openFinishScreen, setOpenFinishScreen] = useState(false);
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
  const specialCharacters =
    questions?.data[0].attributes.quiz.data.attributes.translate_to.data
      .attributes.accentCodes.data;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setFocus,
    watch,
    formState: { errors },
  } = useForm();

  const answerInput = watch("answerInput");

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

    // TODO: 'Add Audio support when clicking submit'

    // audio.currentTime = 0;
    // audio.loop = false;
    // audio.play();
    nextButtonRef.current?.focus();
  };

  // TODO: 'Add Audio support when clicking submit'
  useEffect(() => {
    //   setAudio(new Audio('https://protected-plateau-64458.herokuapp.com/uploads/correct_Answer_b037db8b71.mp3'));
  }, []);

  const test = useState(true);
  useEffect(() => {
    const alertUser = (e) => {
      e.preventDefault();
      e.stopPropagation();
      e.returnValue = "ddddd";
    };
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, [test]);

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

  const handleAddAccent = (specialCharacter) => {
    setValue("answerInput", answerInput.concat(specialCharacter));
    setFocus("answerInput");
  };
  return (
    <div ref={quizViewerRef} className={"relative bg-white/80 "}>
      <ConfirmationModal
        title={"Leave Quiz?"}
        action={() => router.push("/student/quizzes")}
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
            submittedAnswer={answerInput}
          />
          <div className={"flex sm:gap-2 gap-1 justify-center mt-4 flex-wrap"}>
            {specialCharacters && (
              // specialCharacters.map(
              //   (specialCharacter, specialCharacterIndex) => {
              //     return (
              //       <div
              //         onClick={() =>
              //           handleAddSpecialCharacter(specialCharacter)
              //         }
              //         className={
              //           "sm:w-[50px] sm:p-2 p-1 w-[30px] border-2 border-blue-500 rounded-md bg-blue-100 text-blue-500 text-center hover:bg-blue-200 cursor-pointer select-none"
              //         }
              //         key={specialCharacter}
              //       >
              //         {specialCharacter}
              //       </div>
              //     );
              //   }
              // )
              <AccentKeyboard
                alwaysShow={true}
                showSubmitButton={false}
                ref={quizViewerRef}
                triggerElementName={"answerInput"}
                accentList={specialCharacters}
                action={handleAddAccent}
              />
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
