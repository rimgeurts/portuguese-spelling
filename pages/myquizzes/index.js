import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ShareQuizModal from "../../components/dashboard/ShareQuizModal";
import { DeleteQuizButton } from "../../components/designer/DeleteQuizButton";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { generateGetAllQuizzesQuery } from "../../components/util/generateGetAllQuestionsQuery";
import {
  useAddResultsMutation,
  useGetAllQuizzesQuery,
} from "../../redux/apis/strapi";

import {
  updateSelectedQuizId,
  updateUIState,
} from "../../redux/slices/uiSlice";

function Index(props) {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(generateGetAllQuizzesQuery(search));

  console.log({ query });
  const {
    data: quizList,
    error,
    isLoading,
  } = useGetAllQuizzesQuery({ query }, { skip: !session });
  const [addResultsStrapi, addResultStrapiStatus] = useAddResultsMutation();

  useEffect(() => {
    setQuery(generateGetAllQuizzesQuery(search));
  }, [search]);

  const onStartQuiz = async (quizId) => {
    const payload = {
      data: {
        quiz: [quizId],
      },
    };
    const response = await addResultsStrapi(payload);
    dispatch(updateUIState({ activeQuizResultsId: response?.data.data.id }));
  };

  console.log(
    "NEXT_PUBLIC_STRAPI_BASE_URL: ",
    process.env.NEXT_PUBLIC_STRAPI_BASE_URL
  );
  console.log(
    "NEXT_PUBLIC_STRAPI_BASE_URL: ",
    process.env.NEXT_PUBLIC_STRAPI_BASE_URL
  );

  useEffect(() => {
    console.log({ quizList });
  }, [quizList]);

  if (isLoading) {
    return <LoadingSpinner minHeight={"h-[80vh]"} />;
  }

  return (
    <div className={"h-[80vh] px-6"}>
      <div className="md:flex md:items-center md:justify-between py-6 px-4 ">
        <div className="min-w-0 flex flex-col justify-center ">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            My Quizzes
          </h2>
        </div>
        <div className="relative w-full max-w-xs">
          <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center pl-2">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-300 stroke-2" />
          </div>
          <input
            autoComplete={"off"}
            id="search"
            name="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="pl-12  bg-gray-50 placeholder-gray-300 w-full rounded-xl border-gray-100 hover:border-gray-200 py-3 pr-3  focus:border focus:border-blue-500 focus:placeholder-gray-400 focus:outline-none  focus:ring-blue-500"
            placeholder="Search"
            type="search"
          />
        </div>
      </div>
      <div className={"h-[70vh]  overflow-y-auto "}>
        <div
          className={`grid grid-cols-3 items-center py-4 px-4 select-none  bg-gray-50 rounded-lg text-gray-900 font-semibold`}
        >
          <div>Name</div>
          <div>Questions</div>
          <div></div>
        </div>
        {quizList?.data?.map((quiz) => {
          return (
            <Fragment key={quiz.id}>
              <div
                className={`grid grid-cols-3 items-center not-last:border-b border-gray-100 py-4 px-4 select-none `}
              >
                <div
                  className={
                    "cursor-pointer  text-gray-800 hover:font-semibold hover:border-gray-300 hover:text-gray-700 "
                  }
                >
                  <Link href={`/quiz/${quiz.id}`}>
                    <a onClick={() => onStartQuiz(quiz.id)}>{quiz.title}</a>
                  </Link>
                </div>
                <div className={"text-gray-800  ml-8"}>
                  {quiz.questions.length}
                </div>
                <div className={"flex gap-[10px] items-center"}>
                  <ShareQuizModal quizId={quiz.id} />
                  <Link href={`/create/`}>
                    <button
                      onClick={() => {
                        dispatch(
                          updateSelectedQuizId({ selectedQuizId: quiz.id })
                        );
                      }}
                      type="submit"
                      className="inline-flex items-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      <div className={""}>Edit</div>
                    </button>
                  </Link>
                  <DeleteQuizButton quiz={quiz} />
                </div>
              </div>
            </Fragment>
          );
        })}
        <div
          className={`grid grid-cols-3 items-center py-4 px-4 select-none border-t border-gray-100 rounded-lg text-gray-900 `}
        >
          <div></div>
          <div></div>
          <div className={"w-full text-center text-gray-400 text-sm"}>
            Pages 1 2 3 ...... 9 10 11{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
