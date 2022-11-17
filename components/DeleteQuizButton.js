import { TrashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { updateSelectedQuizId } from "../redux/slices/uiSlice";
import { useDispatch } from "react-redux";
import {
  useDeleteQuizMutation,
  useGetAllQuizzesQuery,
  useUpdateQuestionMutation,
} from "../redux/apis/strapi";
import DeleteQuizConfirmationModal from "./DeleteQuizConfirmationModal";

export function DeleteQuizButton({ quiz }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [deleteQuizStrapi, deleteQuizStrapiStatus] = useDeleteQuizMutation();
  const onClick = () => {
    console.log({ quiz });
    deleteQuizStrapi({ id: quiz.id });
  };

  return (
    <>
      <DeleteQuizConfirmationModal deleteQuiz={onClick} open={open} setOpen={setOpen}/>
      <button
        onClick={() => setOpen(true)}
        type="submit"
        className="inline-flex items-center justify-center sm:px-4 px-3 sm:py-2 py-2  sm:text-lg sm:font-medium text-white bg-pink-600 border border-transparent rounded-md shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
      >
        <TrashIcon className="block h-6 w-6 mr-2" aria-hidden="true" />
        <div className={""}>Delete</div>
      </button>
    </>
  );
}
