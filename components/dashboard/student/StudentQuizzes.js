import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddResultsMutation,
  useGetMyLearningQuery,
} from "../../../redux/apis/strapi";
import { selectUI, updateUIState } from "../../../redux/slices/uiSlice";
import IconQuestion from "../../ui/icons/IconQuestion";
import IconQuiz from "../../ui/icons/IconQuiz";
import { generateGetAllQuizzesQuery } from "../../util/generateGetAllQuestionsQuery";
import Pagination from "../teacher/Pagination";

export default function StudentQuizzes() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { myQuizzesSearch, myQuizzesCurrentPage, myQuizzesSearchQuery } =
    useSelector(selectUI);
  const [query, setQuery] = useState(
    generateGetAllQuizzesQuery(myQuizzesSearch, myQuizzesCurrentPage)
  );

  const {
    data: quizList,
    error,
    isLoading,
  } = useGetMyLearningQuery(
    { query: myQuizzesSearchQuery },
    { skip: !session }
  );
  const [addResultsStrapi, addResultStrapiStatus] = useAddResultsMutation();
  const onStartQuiz = async (quizId) => {
    const payload = {
      data: {
        quiz: [quizId],
      },
    };
    const response = await addResultsStrapi(payload);
    dispatch(updateUIState({ activeQuizResultsId: response?.data.data.id }));
  };
  console.log({ quizList });
  return (
    <>
      <div className={"overflow-y-auto h-full"}>
        {quizList?.data?.map((quiz) => {
          const isOwner = quiz?.attributes.isOwner;

          return (
            <Fragment key={quiz.id}>
              <div
                className={`grid grid-cols-10 gap-4 items-start not-last:border-b border-gray-100 py-4 px-4 select-none flex items-center odd:bg-gray-50`}
              >
                <div
                  className={
                    "group col-span-7  flex items-center gap-2 cursor-pointer font-normal text-gray-500 hover:text-gray-600 hover:font-semibold fill-gray-300 "
                  }
                >
                  <div
                    className={
                      " mr-1 group-hover:rotate-6 group-hover:fill-gray-500"
                    }
                  >
                    <IconQuiz />
                  </div>
                  <Link href={`/quiz/${quiz.id}`}>
                    <a className={""} onClick={() => onStartQuiz(quiz.id)}>
                      {quiz?.attributes.title}
                    </a>
                  </Link>
                </div>
                <div className={"col-span-3 text-gray-500 flex items-center "}>
                  <div className={"mr-2 fill-gray-300"}>
                    <IconQuestion />
                  </div>
                  <div>{quiz?.attributes?.questions?.data?.length}</div>
                  <span className={"text-xs  text-gray-400 font-normal  pl-1"}>
                    questions
                  </span>
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
      <div className={`w-full px-4`}>
        <Pagination pagination={quizList?.meta?.pagination} />
      </div>
    </>
  );
}
