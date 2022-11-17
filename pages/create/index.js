import React from "react";
import QuestionTypes from "../../components/QuestionTypes";
import QuestionContentWrapper from "../../components/QuestionContentWrapper";
import { Divider } from "../../components/ui/Divider";
import { QuizSettings } from "../../components/QuizSettings";
import { Title } from "../../components/Title";
import { SubTitle } from "../../components/SubTitle";
import { FormControlButtons } from "../../components/FormControlButtons";
import {
  useGetQuizByIdQuery,
  useUpdateAnswerMutation,
  useUpdateQuestionMutation,
  useUpdateQuizMutation,
} from "../../redux/apis/strapi";
import { useSelector } from "react-redux";
import { selectUI } from "../../redux/slices/uiSlice";
import { CloseQuizButton } from "../../components/CloseQuizButton";
import AddNewQuestionButton from "../../components/AddNewQuestionButton";
import {
  useForm,
  FormProvider,
  useFormContext,
  useWatch,
} from "react-hook-form";
import useOnClickOutside from "../../components/hooks/useClickOutside";

function Index(props) {
  const [updateQuestionStrapi, updateQuestionStrapiStatus] =
    useUpdateQuestionMutation();
  const [updateAnswerStrapi, updateAnswerStrapiStatus] =
    useUpdateAnswerMutation();
  const [updateQuiz, updateQuizResults] = useUpdateQuizMutation();

  const form = useForm();
  const {
    control,
    reset,
    formState: { dirtyFields },
  } = form;

  const inputQuestion = useWatch({
    name: "inputQuestion",
    control,
  });
  const inputAnswer = useWatch({
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
  };

  const handleClick = async () => {
    await uploadAnswerToStrapi();
    await uploadQuestionToStrapi();
    await uploadTitleToStrapi();
    reset({}, { keepValues: true });
  };

  return (
    <FormProvider {...form}>
      <div className={"relative select-none"} onClick={handleClick}>
        <div className={"bg-white border-b border-gray-300"}>
          <div className={"p-4"}>
            <div className={"flex justify-between items-center mb-2 "}>
              <div className={"mr-8"}>
                <Title title={quiz?.attributes?.title ? 'Edit ' + quiz.attributes.title : "Create New Quiz"} />
              </div>
              <CloseQuizButton />
            </div>
            <Divider title={"Quiz Settings"} />
            <QuizSettings />
          </div>
        </div>
        <div className={"bg-gray-50"}>
          <div className={"p-4"}>
            <div className={"sm:flex items-center justify-between"}>
              <SubTitle
                title={`Question ${(activeQuestionIndex + 1) | 0} / ${
                  quiz?.attributes?.questions.data.length
                }`}
              />
              <div className={"flex justify-between items-center gap-2 py-1"}>
                <FormControlButtons />
              </div>
            </div>
            <Divider title={"Question Type"} backgroundColor={"bg-gray-50"} />
            <QuestionTypes />
            <Divider backgroundColor={"bg-gray-50"} />
            <QuestionContentWrapper />
          </div>
        </div>
      </div>
    </FormProvider>
  );
}

export default Index;