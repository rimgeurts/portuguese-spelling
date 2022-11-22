import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUI, updateQuizTitle } from "../../redux/slices/uiSlice";
import {
  useGetQuizByIdQuery,
  useUpdateQuizMutation,
} from "../../redux/apis/strapi";
import { useFormContext } from "react-hook-form";

export function QuizTitle() {
  const dispatch = useDispatch();
  const {
    register,
    setValue,
    control,
    resetField,
    formState: { dirtyFields },
  } = useFormContext();
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
    <form className={""}>
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
      </div>
    </form>
  );
}
