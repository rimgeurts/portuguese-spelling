import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ConfirmationModal from "../ui/ConfirmationModal";

export function ViewerCloseButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen(true);
  };

  return (
    <>
      <ConfirmationModal
        title={"Leave Quiz?"}
        action={() => router.push("/classroom")}
        open={open}
        setOpen={setOpen}
        confirmationButtonName={"Leave"}
      >
        Are you sure you want to leave this quiz?
      </ConfirmationModal>
      <button
        onClick={onClick}
        type="button"
        className="absolute top-2 right-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <span className="sr-only">Close</span>
        <XMarkIcon className="h-8 w-8" aria-hidden="true" />
      </button>
    </>
  );
}
