import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectUI, updateSelectedQuizId } from "../../redux/slices/uiSlice";
import {
  useGetAllQuizzesQuery,
  useGetQuizByIdQuery,
} from "../../redux/apis/strapi";
import { CalendarIcon, MapPinIcon, UsersIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

function Index(props) {
  const dispatch = useDispatch();
  const { data: quizList, error, isLoading } = useGetAllQuizzesQuery();

  if (!isLoading) {
    return (
      <>
        <div>
          {quizList.data.map((quiz) => {
            return (
              <Link href={`/create/`} key={quiz.id}>
                <div
                  className={
                    "border-b-4 border-gray-200 py-4 text-xl font-semibold px-4 cursor-pointer"
                  }
                  onClick={() => {
                    dispatch(updateSelectedQuizId({ selectedQuizId: quiz.id }));
                  }}
                >
                  {quiz.id} - {quiz.attributes.title}
                </div>
              </Link>
            );
          })}
        </div>
      </>
    );
  }
}

export default Index;
