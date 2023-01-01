import {useRouter} from 'next/router';
import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAllLanguagesQuery,
  useGetQuizByIdQuery,
  useUpdateQuizMutation,
} from "../../redux/apis/strapi";
import { selectUI } from "../../redux/slices/uiSlice";
import LanguageComboBox from "./LanguageComboBox";
import { FormErrorMessage } from "../ui/FormErrorMessage";
import IgnoreSpecialCharactersButton from "./IgnoreSpecialCharactersButton";

export default function QuizSettings() {
  const router = useRouter();
  const selectedQuizId = router.query?.id;
  const dispatch = useDispatch();
  const {
    register,
    setValue,
    control,
    getValues,
    watch,
    resetField,
    setFocus,
    formState: { dirtyFields, errors },
  } = useFormContext();
  const { quizTitle, activeQuestionId } = useSelector(selectUI);
  const { isQuizLanguageSelected } = useSelector(selectUI);
  const [updateQuiz, updateQuizResults] = useUpdateQuizMutation();
  const {
    data: quiz,
    error,
    isLoading,
  } = useGetQuizByIdQuery({ selectedQuizId:router.query.id }, { skip: !router.query.id });
  const selectedTranslateToValue = quiz?.attributes?.translate_to?.data;
  const {
    data: languages,
    error: languageError,
    isLoading: languageIsLoading,
  } = useGetAllLanguagesQuery();


  return (
    selectedTranslateToValue && (
      <div className={"grid grid-cols-2 gap-4 items-center"}>
        <div className={"flex flex-col justify-center items-start"}>
          <LanguageComboBox
            label={""}
            selectedQuizId={selectedQuizId}
            data={languages}
            selectedLanguage={selectedTranslateToValue}
          />
        </div>
        <div>
          <IgnoreSpecialCharactersButton />
        </div>
      </div>
    )
  );
}
