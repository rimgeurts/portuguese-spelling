import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import {
  useForm,
  FormProvider,
  useFormContext,
  useWatch,
} from "react-hook-form";
import {
  useGetQuizByIdQuery,
  useUpdateAnswerMutation,
  useUpdateQuestionMutation,
  useUpdateQuizMutation
} from "../../../redux/apis/strapi";
import {selectUI} from "../../../redux/slices/uiSlice";

export default function useSaveQuizData({ form }) {
  const [updateQuestionStrapi, updateQuestionStrapiStatus] =
    useUpdateQuestionMutation();
  const [updateAnswerStrapi, updateAnswerStrapiStatus] =
    useUpdateAnswerMutation();
  const [updateQuiz, updateQuizResults] = useUpdateQuizMutation();

  const {
    watch,
    control,
    reset,
    formState: { dirtyFields },
  } = form;

  const inputQuestion =  useWatch({
    name: "inputQuestion",
    control,
  });
  const inputAnswer =  useWatch({
    name: "inputAnswer",
    control,
  });

  const inputTitle = useWatch({
    name: "inputTitle",
    control,
  });

  const {
    selectedQuizId,
    activeQuestionId,
    activeAnswerId,
    activeQuestionIndex,
  } = useSelector(selectUI);
  const {
    data: quiz,
    error,
    isLoading,
  } = useGetQuizByIdQuery({ selectedQuizId }, { skip: !selectedQuizId });

  const uploadQuestionToStrapi = () => {
    if (!dirtyFields.hasOwnProperty("inputQuestion")) {
      return;
    }
    const payload = {
      id: activeQuestionId,
      data: {
        title: inputQuestion,
        quiz: [selectedQuizId],
      },
      cache: {
        id: selectedQuizId,
      },
    };

    updateQuestionStrapi(payload);
    reset({}, { keepValues: true });
  };

  const uploadAnswerToStrapi = async () => {
    if (!dirtyFields.hasOwnProperty("inputAnswer")) {
      return;
    }
    const payload = {
      id: activeAnswerId,
      data: {
        title: inputAnswer,
        quiz: [selectedQuizId],
        question: [activeQuestionId],
      },
    };
    const response = await updateAnswerStrapi(payload);
    reset({}, { keepValues: true });
  };

  const uploadTitleToStrapi = async () => {
    if (!dirtyFields.hasOwnProperty("inputTitle")) {
      return;
    }
    const payload = {
      id: selectedQuizId,
      data: {
        title: inputTitle,
      },
    };
    updateQuiz(payload);
    reset({}, { keepValues: true });
  };

  const saveQuizData = async () => {
    await uploadAnswerToStrapi();
    await uploadQuestionToStrapi();
    await uploadTitleToStrapi();
  };

  return { saveQuizData, uploadTitleToStrapi, uploadAnswerToStrapi, uploadQuestionToStrapi };
}
