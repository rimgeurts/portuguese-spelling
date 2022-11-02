import React from "react";
import QuestionTypes from "../../components/QuestionTypes";
import QuestionContentWrapper from "../../components/QuestionContentWrapper";
import { Divider } from "../../components/ui/Divider";
import { QuizSettings } from "../../components/QuizSettings";
import { Title } from "../../components/Title";
import { SubTitle } from "../../components/SubTitle";
import { FormControlButtons } from "../../components/FormControlButtons";
import { useGetAllQuizzesQuery } from "../../redux/apis/strapi";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

function Index(props) {
  const { data: quizzes, error, isLoading } = useGetAllQuizzesQuery();
  return (
    <>
      <div className={"bg-white border-b border-gray-300 "}>
        <div className={"p-4"}>
          <div className={"flex justify-between"}>
            <div className={""}>
              <Title title={"Create New Quiz"} />
            </div>
            <button
              type="submit"
              className=" inline-flex items-center sm:px-4 px-2 sm:py-2 py-2 max-h-12  sm:text-lg sm:font-medium text-white bg-pink-600 border border-transparent rounded-md shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
            >
              Save & Close
            </button>
          </div>
          <Divider title={"Quiz Settings"} />
          <QuizSettings />
          <Divider title={"Question Type"} />
          <QuestionTypes />
        </div>
      </div>
      <div className={"bg-gray-100"}>
        <div className={"p-4"}>
          <div className={"flex items-center justify-between mb-4"}>
            <SubTitle title={"Question 1/10"} />
            <div className={"flex justify-end gap-2"}>
              <FormControlButtons />
            </div>
          </div>
          <QuestionContentWrapper />
        </div>
      </div>
    </>
  );
}

export default Index;
