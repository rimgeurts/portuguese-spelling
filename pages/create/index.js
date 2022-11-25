import React, { useEffect } from "react";
import QuestionTypes from "../../components/designer/QuestionTypes";
import QuestionContentWrapper from "../../components/designer/QuestionContentWrapper";
import { Divider } from "../../components/ui/Divider";
import { QuizTitle } from "../../components/designer/QuizTitle";
import { Title } from "../../components/designer/Title";
import { SubTitle } from "../../components/designer/SubTitle";
import { FormControlButtons } from "../../components/designer/FormControlButtons";
import { useGetQuizByIdQuery } from "../../redux/apis/strapi";
import { useSelector } from "react-redux";
import { selectUI } from "../../redux/slices/uiSlice";
import { CloseQuizButton } from "../../components/designer/CloseQuizButton";
import { useForm, FormProvider } from "react-hook-form";
import QuizSettings from "../../components/designer/QuizSettings";
import useSaveQuizData from "../../components/designer/hooks/useSaveQuizData";

export default function Index() {
  const form = useForm();
  const {
    watch,
    formState: { dirtyFields },
  } = form;
  const watchAllInputFields = watch();
  const { saveQuizData } = useSaveQuizData({ form });

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

  return (
    <div className={"h-full"}>
      <FormProvider {...form}>
        <div className={"relative select-none"}>
          <div className={"bg-white border-b border-gray-300"}>
            <div className={"p-4"}>
              <div className={"flex justify-between items-center mb-8 "}>
                <div className={"mr-8"}>
                  <Title
                    title={
                      quiz?.attributes?.title
                        ? "Edit " + quiz.attributes.title
                        : "Create New Quiz"
                    }
                  />
                </div>
                <CloseQuizButton />
              </div>
              <QuizTitle />
              <Divider title={"Quiz Settings"} />
              <QuizSettings />
            </div>
          </div>
          <div className={"bg-gray-50 h-[50vh]"}>
            <div className={"p-6  h-full overflow-y-scroll"}>
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
    </div>
  );
}
