import { useSession } from "next-auth/react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddResultsMutation,
  useGetAllQuizzesQuery,
} from "../../redux/apis/strapi";
import {
  selectUI,
  updateSelectedQuizId,
  updateUIState,
} from "../../redux/slices/uiSlice";
import { DeleteQuizButton } from "../designer/DeleteQuizButton";
import { generateGetAllQuizzesQuery } from "../util/generateGetAllQuestionsQuery";
import Pagination from "./Pagination";
import ShareQuizModal from "./ShareQuizModal";

export default function MyQuizzes() {
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
  } = useGetAllQuizzesQuery(
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

  useEffect(() => {
    console.log({ quizList });
  }, [quizList]);

  return (
    <>
      <div className={"overflow-y-auto h-full"}>
        {quizList?.data?.map((quiz) => {
          const isOwner = quiz?.attributes.isOwner;
          return (
            <Fragment key={quiz.id}>
              <div
                className={`grid grid-cols-10 gap-4 items-start not-last:border-b border-gray-100 py-3 px-4 select-none flex items-center`}
              >
                <div className={"col-span-6"}>
                  <Link href={`/quiz/${quiz.id}`}>
                    <a
                      className={
                        "cursor-pointer font-medium text-sm   text-gray-500 hover:text-gray-700 hover:font-semibold"
                      }
                      onClick={() => onStartQuiz(quiz.id)}
                    >
                      {quiz?.attributes.title}
                    </a>
                  </Link>
                  <div className={"text-base font-normal"}>
                    {isOwner && <ShareQuizModal quizId={quiz.id} />}
                  </div>
                </div>
                <div
                  className={
                    "col-span-1 text-gray-500 hover:text-gray-700  flex items-center"
                  }
                >
                  <div>{quiz?.attributes?.questions?.data?.length}</div>
                  <span className={"text-xs  text-gray-400 font-normal  pl-1"}>
                    questions
                  </span>
                </div>
                <div
                  className={"col-span-3 flex gap-2 items-center justify-end"}
                >
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
      </div>
      <div className={`w-full mt-2 px-4`}>
        <Pagination pagination={quizList?.meta?.pagination} />
      </div>
    </>
  );
}
