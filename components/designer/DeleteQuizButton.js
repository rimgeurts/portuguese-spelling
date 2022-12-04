import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useDeleteQuizMutation } from "../../redux/apis/strapi";
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
        confirmationButtonName={"Delete"}
      >
        Are you sure you want to delete this quiz? All of your quiz data will be
        permanently removed from our servers forever. This action cannot be
        undone
      </ConfirmationModal>
      <button
        onClick={() => setOpen(true)}
        type="submit"
        className="inline-flex items-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        <div className={""}>Delete</div>
      </button>
    </>
  );
}
