import { getSession, useSession } from "next-auth/react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { CloseQuizButton } from "../../components/designer/CloseQuizButton";
import { FormControlButtons } from "../../components/designer/FormControlButtons";
import useSaveQuizData from "../../components/designer/hooks/useSaveQuizData";
import QuestionContentWrapper from "../../components/designer/QuestionContentWrapper";
import QuestionTypes from "../../components/designer/QuestionTypes";
import QuizSettings from "../../components/designer/QuizSettings";
import { QuizTitle } from "../../components/designer/QuizTitle";
import { SubTitle } from "../../components/designer/SubTitle";
import { Title } from "../../components/designer/Title";
import { Divider } from "../../components/ui/Divider";
import { useGetQuizByIdQuery } from "../../redux/apis/strapi";
import { selectUI } from "../../redux/slices/uiSlice";

const Index = () => {
  const { data: session, status } = useSession();
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
          <div className={"bg-gray-50 h-[50vh] "}>
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
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/login?origin=create",
        permanent: false,
      },
    };
  }
  return {
    props: {
      content: "",
    },
  };
}

export default Index;
