import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useFormContext, useWatch } from "react-hook-form";
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
} from "../redux/slices/uiSlice";
import {
  useGetQuizByIdQuery,
  useUpdateAnswerMutation,
  useUpdateQuestionMutation,
  useUpdateQuizMutation,
} from "../redux/apis/strapi";
import useOnClickOutside from "./hooks/useClickOutside";

export default function QuestionTypeTranslation() {
  const dispatch = useDispatch();
  const questionRef = useRef();
  const answerRef = useRef();
  const {
    register,
    setValue,
    control,
    resetField,
    formState: { dirtyFields },
  } = useFormContext();

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
  const inputQuestion = useWatch({
    name: "inputQuestion",
    control,
  });
  const inputAnswer = useWatch({
    name: "inputAnswer",
    control,
  });



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
  }, [activeQuestionId]);

  return (
    <div className={"flex flex-col gap-4"}>
      value: {inputQuestion}
      <Fragment key={question?.id}>
        <form ref={questionRef}>
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700"
          >
            Question id:{question?.id}
          </label>
          <div className="mt-1">
            <textarea
              {...register("inputQuestion")}
              rows={4}
              className="block w-full rounded-md border-dashed border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </form>
        {answers?.map((answer, answerIndex) => {
          return (
            <form
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
                Answer id:{answer.id}
              </label>
              <div className="mt-1 flex items-center gap-2">
                <textarea
                  {...register("inputAnswer")}
                  rows={4}
                  className="block w-full rounded-md border-dashed border-2 border-gray-300 shadow-sm focus:border-blue-500  sm:text-sm"
                />
              </div>
            </form>
          );
        })}
      </Fragment>
    </div>
  );
}
