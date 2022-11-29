import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUI, updateQuizTitle } from "../../redux/slices/uiSlice";
import {
  useGetQuizByIdQuery,
  useUpdateQuizMutation,
} from "../../redux/apis/strapi";
import { useFormContext } from "react-hook-form";
import useSaveQuizData from "./hooks/useSaveQuizData";
import {loadGetInitialProps} from "next/dist/shared/lib/utils";

export function QuizTitle() {
  const dispatch = useDispatch();
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    control,
    resetField,
    formState: { dirtyFields },
  } = useFormContext();
  const form = useFormContext();

  const { saveQuizData } = useSaveQuizData({ form });
  const { selectedQuizId, quizTitle, activeQuestionId } = useSelector(selectUI);

  const {
    data: quiz,
    error,
    isLoading,
  } = useGetQuizByIdQuery({ selectedQuizId }, { skip: !selectedQuizId });

  useEffect(() => {
    if (!quiz) {
      return;
    }
    setValue("inputTitle", quiz.attributes.title);
  }, [quiz]);


  return (
    <form
      className={"mb-1"}
      onSubmit={handleSubmit(() => {
        saveQuizData();
      })}
    >
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        Quiz Title
      </label>
      <div className="mt-1 flex gap-2">
        <input
          onBlur={() => {
          }}
          autoComplete="off"
          type="text"
          {...register("inputTitle", {
            onBlur: (e) => {
                saveQuizData();
            }
          })}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />

      </div>
    </form>
  );
}
