import {useRouter} from 'next/router';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetQuizByIdQuery,
  useUpdateAnswerMutation,
  useUpdateQuestionMutation,
} from "../../redux/apis/strapi";
import {
  selectUI,
  updateActiveAnswerId,
  updateActiveAnswerIndex,
} from "../../redux/slices/uiSlice";
import AccentKeyboard from "../viewer/AccentKeyboard";
import AnswerAudio from "./AnswerAudio";
import useSaveQuizData from "./hooks/useSaveQuizData";

export default function QuestionTypeTranslation() {
  const router = useRouter();
  const dispatch = useDispatch();
  const questionRef = useRef();
  const answerRef = useRef();
  const form = useFormContext();
  const [showQuestionKeyboard, setShowQuestionKeyboard] = useState(false);
  const [showAnswerKeyboard, setShowAnswerKeyboard] = useState(false);
  const { saveQuizData } = useSaveQuizData({ form });
  const {
    register,
    setValue,
    control,
    setFocus,
    watch,
    resetField,
    handleSubmit,
    formState: { dirtyFields },
  } = form;

  const {
    selectedQuizId,
    activeQuestionId,
    activeAnswerId,
    activeQuestionIndex,
    activeAnswerIndex,
    hasActiveQuestionChanged,
  } = useSelector(selectUI);
  const [updateQuestionStrapi, updateQuestionStrapiStatus] =
    useUpdateQuestionMutation();
  const [updateAnswerStrapi, updateAnswerStrapiStatus] =
    useUpdateAnswerMutation();
  const { data: quiz, isLoading: quizLoading } = useGetQuizByIdQuery(
    { selectedQuizId: router.query.id },
    { skip: !router.query.id }
  );

  const question = quiz?.attributes.questions.data[activeQuestionIndex];
  const answers = question?.attributes.answers.data;
  const accentCodes =
    quiz?.attributes.translate_to.data?.attributes.accentCodes?.data;
  const inputQuestion = watch("inputQuestion");
  const inputAnswer = watch("inputAnswer");

  const handleAddAccentToInputQuestion = (accentCode) => {
    setValue("inputQuestion", inputQuestion.concat(accentCode), {
      shouldDirty: true,
    });
    setFocus("inputQuestion");
  };
  const handleAddAccentToAnswerQuestion = (accentCode) => {
    setValue("inputAnswer", inputAnswer.concat(accentCode), {
      shouldDirty: true,
    });
    setFocus("inputAnswer");
  };

  useEffect(() => {
    if (!quiz) {
      return;
    }
    setValue(
      "inputQuestion",
      quiz.attributes.questions.data[activeQuestionIndex].attributes.title
    );
    setValue(
      "inputAnswer",
      quiz.attributes.questions.data[activeQuestionIndex].attributes.answers
        .data[activeAnswerIndex].attributes.title
    );
    setFocus("inputQuestion");
  }, [activeQuestionId]);

  return (
    <div className={"flex flex-col gap-1"}>
      <Fragment key={question?.id}>
        <form
          ref={questionRef}
          onSubmit={handleSubmit(() => {
            saveQuizData();
            setFocus("inputAnswer");
          })}
        >
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700"
          >
            Question id: {question?.id}
          </label>
          <div className="mt-1 relative mb-4">
            <input
              autoComplete={"off"}
              spellCheck={"false"}
              type="text"
              {...register("inputQuestion", {
                onBlur: (e) => {
                  saveQuizData();
                },
              })}
              className=" focus:ring-0 block w-full rounded-md border-dashed border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <div
              onClick={() => {
                setShowAnswerKeyboard(false);
                setShowQuestionKeyboard(!showQuestionKeyboard);
              }}
              className={
                "absolute top-0 right-3 text-gray-400 hover:text-gray-500 text-4xl cursor-pointer"
              }
            >
              ⌨
            </div>
            <AccentKeyboard
              show={showQuestionKeyboard}
              setShow={setShowQuestionKeyboard}
              showSubmitButton={true}
              accentList={accentCodes}
              action={handleAddAccentToInputQuestion}
            />
          </div>
        </form>
        {answers?.map((answer, answerIndex) => {
          return (
            <form
              onSubmit={handleSubmit(() => {
                saveQuizData();
                document.getElementById("add-new-question-button").focus();
              })}
              ref={answerRef}
              key={answer.id}
              onMouseDown={() => {
                dispatch(
                  updateActiveAnswerId({
                    activeAnswerId: answer.id,
                  })
                );
                dispatch(
                  updateActiveAnswerIndex({
                    activeAnswerIndex: answerIndex,
                  })
                );
              }}
            >
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-gray-700"
              >
                Answer id: {answer.id}
              </label>
              <div className={"p-2"}>
                <AnswerAudio
                  loading={quizLoading}
                  word={answer.attributes.title}
                  audioUrl={
                    answer?.attributes.answerAudio?.data?.attributes.url
                  }
                />
              </div>
              <div className="relative mt-1 ">
                <input
                  autoComplete={"off"}
                  spellCheck={"false"}
                  type="text"
                  {...register("inputAnswer", {
                    onBlur: (e) => {
                      saveQuizData();
                    },
                  })}
                  className="focus:ring-0  block w-full rounded-md border-dashed border-2 border-gray-300 shadow-sm focus:border-blue-500  sm:text-sm"
                />
                <div
                  onClick={() => {
                    setShowQuestionKeyboard(false);
                    setShowAnswerKeyboard(!showAnswerKeyboard);
                  }}
                  className={
                    "absolute top-0 right-3 text-gray-400 hover:text-gray-500 text-4xl cursor-pointer"
                  }
                >
                  ⌨
                </div>
                <AccentKeyboard
                  show={showAnswerKeyboard}
                  setShow={setShowAnswerKeyboard}
                  showSubmitButton={true}
                  accentList={accentCodes}
                  action={handleAddAccentToInputQuestion}
                />
              </div>
            </form>
          );
        })}
      </Fragment>
    </div>
  );
}
