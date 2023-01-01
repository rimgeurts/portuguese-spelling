import {useRouter} from 'next/router';
import React, { useEffect, useState } from "react";
import ToggleButton from "../ui/ToggleButton";
import {
  useGetQuizByIdQuery,
  useUpdateQuizMutation,
} from "../../redux/apis/strapi";
import { useSelector } from "react-redux";
import { selectUI } from "../../redux/slices/uiSlice";

function IgnoreSpecialCharactersButton(props) {
  const router = useRouter();
  const [enabled, setEnabled] = useState(false);
  const [updateQuiz, updateQuizResults] = useUpdateQuizMutation();
  const { selectedQuizId } = useSelector(selectUI);
  const {
    data: quiz,
    error,
    isLoading,
  } = useGetQuizByIdQuery({ selectedQuizId: router.query.id }, { skip: !router.query.id });
  const ignoreSpecialCharacterEnabled =
    quiz?.attributes.ignoreSpecialCharacters;

  useEffect(() => {
    setEnabled(ignoreSpecialCharacterEnabled);
  }, []);

  useEffect(() => {
    const payload = {
      id: router?.query?.id,
      data: {
        ignoreSpecialCharacters: enabled,
      },
    };
    updateQuiz(payload);
  }, [enabled]);

  return (
    <ToggleButton
      title={"Ignore special characters"}
      subTitle={"If enabled, language specific accents (i.e. è, ç, ô)  will be ignored when taking the quiz"}
      enabled={enabled}
      setEnabled={setEnabled}
    />
  );
}

export default IgnoreSpecialCharactersButton;
