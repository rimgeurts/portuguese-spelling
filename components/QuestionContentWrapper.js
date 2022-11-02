import React from "react";
import { QuestionContentToolbar } from "./QuestionContentToolbar";
import QuestionTypeTranslation from "./QuestionTypeTranslation";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";

export default function QuestionContentWrapper() {
  return (
    <div className={"rounded-md "}>

      <div className={`relative rounded-md`}>
        <QuestionTypeTranslation />
      </div>

    </div>
  );
}
