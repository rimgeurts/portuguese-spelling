import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUI, updateQuizTitle } from "../../redux/slices/uiSlice";
import {
  useGetQuizByIdQuery,
  useUpdateQuizMutation,
} from "../../redux/apis/strapi";
import { useFormContext } from "react-hook-form";
import useSaveQuizData from "./hooks/useSaveQuizData";

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
  const [showSubmitButton, setShowSubmitButton] = useState(false);

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
    <form className={"mb-1"} onSubmit={handleSubmit(()=> {saveQuizData(); setShowSubmitButton(false)})}>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        Quiz Title
      </label>
      <div className="mt-1 flex gap-2">
        <input
          autoComplete="off"
          onClick={() => setShowSubmitButton(true)}
          type="text"
          {...register("inputTitle")}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
        {showSubmitButton && (
          <button
            type="submit"
            className="max-h-11 inline-flex items-center rounded border border-transparent bg-blue-600 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        )}
      </div>
    </form>
  );
}
