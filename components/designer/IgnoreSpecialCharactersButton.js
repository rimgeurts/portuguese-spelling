import React, { useEffect, useState } from "react";
import ToggleButton from "../ui/ToggleButton";
import {
  useGetQuizByIdQuery,
  useUpdateQuizMutation,
} from "../../redux/apis/strapi";
import { useSelector } from "react-redux";
import { selectUI } from "../../redux/slices/uiSlice";

function IgnoreSpecialCharactersButton(props) {
  const [enabled, setEnabled] = useState(false);
  const [updateQuiz, updateQuizResults] = useUpdateQuizMutation();
  const { selectedQuizId } = useSelector(selectUI);
  const {
    data: quiz,
    error,
    isLoading,
  } = useGetQuizByIdQuery({ selectedQuizId }, { skip: !selectedQuizId });
  const ignoreSpecialCharacterEnabled =
    quiz?.attributes.ignoreSpecialCharacters;

  useEffect(() => {
    setEnabled(ignoreSpecialCharacterEnabled);
  }, []);

  useEffect(() => {
    console.log(enabled);
    const payload = {
      id: selectedQuizId,
      data: {
        ignoreSpecialCharacters: enabled,
      },
    };
    updateQuiz(payload);
  }, [enabled]);

  return (
    <ToggleButton
      title={"Ignore special characters"}
      subTitle={"This includes capital letters and language specific accents"}
      enabled={enabled}
      setEnabled={setEnabled}
    />
  );
}

export default IgnoreSpecialCharactersButton;
