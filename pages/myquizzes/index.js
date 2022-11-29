import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  updateSelectedQuizId,
  updateUIState,
} from "../../redux/slices/uiSlice";
import {
  useAddResultsMutation,
  useGetAllQuizzesQuery,
} from "../../redux/apis/strapi";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { DeleteQuizButton } from "../../components/designer/DeleteQuizButton";
import { generateGetAllQuizzesQuery } from "../../components/util/generateGetAllQuestionsQuery";
import { useSession } from "next-auth/react";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import ShareQuizModal from "../../components/dashboard/ShareQuizModal";

function Index(props) {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(generateGetAllQuizzesQuery(search))

  console.log({query})
  const { data: quizList, error, isLoading } = useGetAllQuizzesQuery({ query }, { skip: !session });
  const [addResultsStrapi, addResultStrapiStatus] = useAddResultsMutation();

  useEffect(() => {
    setQuery(generateGetAllQuizzesQuery(search))
  }, [search])

  const onStartQuiz = async (quizId) => {
    const payload = {
      data: {
        quiz: [quizId],
      },
    };
    const response = await addResultsStrapi(payload);
    dispatch(updateUIState({ activeQuizResultsId: response?.data.data.id }));
  };

  if (isLoading) {
    return <LoadingSpinner minHeight={'h-[80vh]'} />;
  }

  return (
    <div className={"h-[80vh]"}>
      <div
        className={
          "px-4 py-4 rounded-t-md mb-2 text-xl text-gray-800 flex items-center justify-start  border-gray-200"
        }
      >
        <div className={"w-full"}>
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon
                className="h-6 w-6 text-gray-300 stroke-2 "
              />
            </div>
            <input
              autoComplete={"off"}
              id="search"
              name="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className=" block w-full rounded-xl border-1 border-gray-200 hover:border-gray-300/70 bg-gray-200/40 py-4 pl-10 pr-3 placeholder-gray-500 focus:border focus:border-blue-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Search"
              type="search"
            />
          </div>
        </div>
      </div>
      <div className={"h-[70vh]  overflow-y-scroll "}>
        {quizList?.data?.map((quiz) => {
          return (
            <Fragment key={quiz.id}>
              <div
                className={`flex justify-between items-center not-last:border-b border-gray-200 py-4 px-4 select-none `}
              >
                <div
                  className={
                    "cursor-pointer  text-gray-800 hover:font-semibold hover:border-gray-300 hover:text-gray-700 "
                  }
                >
                  <Link href={`/quiz/${quiz.id}`}>
                    <a onClick={() => onStartQuiz(quiz.id)}>
                      {quiz.id} - {quiz.title}
                    </a>
                  </Link>
                </div>
                <div className={"flex gap-[20px] items-center"}>
                  <ShareQuizModal/>
                  <Link href={`/create/`}>
                    <button
                      onClick={() => {
                        dispatch(
                          updateSelectedQuizId({ selectedQuizId: quiz.id })
                        );
                      }}
                      type="submit"
                      className=" inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      <PencilSquareIcon
                        className="block h-4 w-4 mr-1"
                        aria-hidden="true"
                      />
                      <div className={""}>Edit</div>
                    </button>
                  </Link>
                  <DeleteQuizButton quiz={quiz} />
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default Index;
