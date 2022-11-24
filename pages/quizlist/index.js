import React, { Fragment, useEffect } from "react";
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
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { DeleteQuizButton } from "../../components/designer/DeleteQuizButton";

function Index(props) {
  const dispatch = useDispatch();
  const { data: quizList, error, isLoading } = useGetAllQuizzesQuery();

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

  if (!isLoading) {
    return (
      <div className={'max-h-[70vh]  overflow-y-scroll pr-2'}>
        {quizList.data.map((quiz) => {
          return (
            <Fragment key={quiz.id}>
              <div
                className={`flex justify-between items-center not-last:border-b border-gray-200 py-4 px-4 select-none `}
              >
                <div
                  className={
                    "cursor-pointer text-lg font-medium text-gray-900 text-gray-500 hover:border-gray-300 hover:text-gray-700 hover:text-xl"
                  }
                >
                  <Link href={`/quiz/${quiz.id}`}>
                    <a onClick={() => onStartQuiz(quiz.id)}>
                      {quiz.id} - {quiz.attributes.title}
                    </a>
                  </Link>
                </div>
                <div className={"flex gap-4 items-center"}>
                  <Link href={`/create/`} >
                    <button
                      onClick={() => {
                        dispatch(
                          updateSelectedQuizId({ selectedQuizId: quiz.id })
                        );
                      }}
                      type="submit"
                      className="inline-flex items-center justify-center sm:px-4 px-3 sm:py-2 py-2  sm:text-lg sm:font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      <PencilSquareIcon
                        className="block h-6 w-6 mr-2"
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
    );
  }
}

export default Index;
