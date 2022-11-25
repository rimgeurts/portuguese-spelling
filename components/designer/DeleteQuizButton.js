import { TrashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { updateSelectedQuizId } from "../../redux/slices/uiSlice";
import { useDispatch } from "react-redux";
import {
  useDeleteQuizMutation,
  useGetAllQuizzesQuery,
  useUpdateQuestionMutation,
} from "../../redux/apis/strapi";
import ConfirmationModal from "../ui/ConfirmationModal";

export function DeleteQuizButton({ quiz }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [deleteQuizStrapi, deleteQuizStrapiStatus] = useDeleteQuizMutation();

  const onClick = () => {
    deleteQuizStrapi({ id: quiz.id });
  };

  return (
    <>
      <ConfirmationModal
        title={"Delete Quiz?"}
        action={onClick}
        open={open}
        setOpen={setOpen}
        confirmationButtonName={'Delete'}
      >
        Are you sure you want to delete this quiz? All of your quiz data will be
        permanently removed from our servers forever. This action cannot be
        undone
      </ConfirmationModal>
      <button
        onClick={() => setOpen(true)}
        type="submit"
        className=" inline-flex items-center rounded-md border border-transparent bg-pink-600 px-3 py-2 text-base font-medium text-white shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
      >
        <TrashIcon className="block h-4 w-4 mr-1" aria-hidden="true" />
        <div className={""}>Delete</div>
      </button>
    </>
  );
}
