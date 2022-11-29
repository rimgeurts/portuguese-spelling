import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useFormContext } from "react-hook-form";
import {
  selectUI,
  addQuestions,
  updateQuestion,
  updateAnswer,
  updateActiveAnswerId,
  updateActiveQuestionIndex,
  updateActiveAnswerIndex,
  updateHasActiveQuestionChanged,
  updateUIState,
} from "../../redux/slices/uiSlice";
import {
  useGetQuizByIdQuery,
  useUpdateAnswerMutation,
  useUpdateQuestionMutation,
  useUpdateQuizMutation,
} from "../../redux/apis/strapi";
import useOnClickOutside from "../hooks/useClickOutside";
import AddNewQuestionButton from "./AddNewQuestionButton";
import AccentKeyboard from "../viewer/AccentKeyboard";
import useSaveQuizData from "./hooks/useSaveQuizData";

export default function QuestionTypeTranslation() {
  const dispatch = useDispatch();
  const questionRef = useRef();
  const answerRef = useRef();
  const form = useFormContext();
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
  const {
    data: quiz,
    error,
    isLoading,
  } = useGetQuizByIdQuery({ selectedQuizId }, { skip: !selectedQuizId });
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
      <div className={"flex items-center justify-end"}>
        <AddNewQuestionButton />
      </div>
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
          <div className="mt-1">
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
          </div>
          <div className={" flex gap-1 w-full justify-center p-2"}>
            <AccentKeyboard
              showSubmitButton={true}
              ref={questionRef}
              triggerElementName={"inputQuestion"}
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
              <div className="mt-1 flex items-center gap-2">
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
              </div>
              <div className={"flex gap-1 w-full justify-center p-2"}>
                <AccentKeyboard
                  showSubmitButton={true}
                  ref={answerRef}
                  triggerElementName={"inputAnswer"}
                  accentList={accentCodes}
                  action={handleAddAccentToAnswerQuestion}
                />
              </div>
            </form>
          );
        })}
      </Fragment>
    </div>
  );
}
