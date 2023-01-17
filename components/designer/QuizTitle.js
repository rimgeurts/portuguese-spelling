import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUI, updateQuizTitle } from "../../redux/slices/uiSlice";
import {
  useGetQuizByIdQuery,
  useUpdateQuizMutation,
} from "../../redux/apis/strapi";
import { useFormContext } from "react-hook-form";
import useSaveQuizData from "./hooks/useSaveQuizData";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";

export function QuizTitle() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    watch,
    control,
    resetField,
    formState: { dirtyFields },
  } = useFormContext();
  const form = useFormContext();
  const [updateQuiz, updateQuizResults] = useUpdateQuizMutation();
  const { saveQuizData } = useSaveQuizData({ form });
  const { quizTitle, activeQuestionId } = useSelector(selectUI);

  const {
    data: quiz,
    error,
    isLoading,
  } = useGetQuizByIdQuery(
    { selectedQuizId: router.query.id },
    { skip: !router.query.id }
  );

  useEffect(() => {
    if (!quiz) {
      return;
    }
    setValue("inputTitle", quiz.attributes.title);
  }, [quiz]);

  const onSubmit = (data) => {
    console.log('title', data);
    const payload = {
      id: router.query.id,
      data: {
        title: data.inputTitle,
      },
    };
    updateQuiz(payload);
    console.log('subbmitting and resetting values');
    reset({}, { keepValues: true });
  };

  return (
    <form
      className={"mb-1"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <button className={'bg-blue-500 text-white font-semibold p-2 rounded-lg'}>Submit</button>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        Quiz Title
      </label>
      <div className="mt-1 flex gap-2">
        <input
          onBlur={() => {}}
          autoComplete="off"
          type="text"
          {...register("inputTitle", {
            onBlur: (e) => {
              handleSubmit(onSubmit)(e);
            },
          })}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>
    </form>
  );
}
