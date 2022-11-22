import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {selectUI, updateQuizTitle, updateUIState} from "../../redux/slices/uiSlice";
import {
  useGetAllLanguagesQuery,
  useGetQuizByIdQuery,
  useUpdateQuizMutation,
} from "../../redux/apis/strapi";
import { useFormContext } from "react-hook-form";
import ComboBox from "../ui/ComboBox";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function QuizSettings() {
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
  const {isQuizLanguageSelected} = useSelector(selectUI)
  const [updateQuiz, updateQuizResults] = useUpdateQuizMutation();
  const {
    data: quiz,
    error,
    isLoading,
  } = useGetQuizByIdQuery({ selectedQuizId }, { skip: !selectedQuizId });
  const selectedTranslateFromValue = quiz?.attributes?.translate_from.data?.attributes.title
  const selectedTranslateToValue = quiz?.attributes?.translate_to.data?.attributes.title
  const {
    data: languages,
    error: languageError,
    isLoading: languageIsLoading,
  } = useGetAllLanguagesQuery();

  useEffect(() => {
    if (!quiz) {
      return;
    }
  }, [quiz]);


  const onChangeToLanguage = (selectedLanguage) => {

    if(selectedLanguage.id === 'xxxx') {
      return;
    }
    dispatch(updateUIState({isQuizLanguageSelected: true}))
    const payload = {
      id: selectedQuizId,
      data: {
        translate_to: { id: selectedLanguage.id },
      },
    };
    updateQuiz(payload);
  };

  return selectedTranslateToValue && (
    <div className={"grid grid-cols-2 gap-4"}>
      <div className={"flex flex-col justify-center items-start"}>
        <div className={"block text-sm font-medium text-gray-700"}>
          Translate to:
        </div>
        <div className={"flex items-center gap-1"}>
          <ComboBox
            label={""}
            defaultValue={selectedTranslateToValue}
            data={languages}
            onChangeAction={onChangeToLanguage}
            isError={!isQuizLanguageSelected}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
}
