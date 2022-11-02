import { Transition } from "@headlessui/react";
import { useState } from "react";
import * as PropTypes from "prop-types";

function Card({ title, show }) {
  return (
    <div>
      <Transition
        show={show}
        enter="transition ease duration-[1100ms] transform"
        enterFrom="-translate-x-[1000px]"
        enterTo="translate-x-0"
        leave="transition ease duration-[1100ms] transform"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-[1000px]"
      >
        <div
          className={
            "bg-gray-300 w-[600] h-[300px] m-4 flex items-center justify-center"
          }
        >
          {title}
        </div>
      </Transition><Transition
        show={!show}
        enter="transition ease duration-[1100ms] transform"
        enterFrom="-translate-x-[900px]"
        enterTo="translate-x-0"
        leave="transition ease duration-[1100ms] transform"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-[900px]"
      >
        <div
          className={
            "bg-gray-300 w-[600] h-[300px] m-4 flex items-center justify-center"
          }
        >
          {title}
        </div>
      </Transition>
    </div>
  );
}

export default function Index() {
  const [isShowing, setIsShowing] = useState(true);
  const [questions, setQuestions] = useState([
    "Question 1",
    "Question 2",
    "Question 3",
    "Question 4",
    "Question 5",
    "Question 6",
    "Question 7",
    "Question 8",
    "Question 9",
  ]);
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const handleLoadNext = () => {
    setIsShowing((isShowing) => !isShowing);
    setCurrentQuestion((currentQuestion) => currentQuestion + 1)
  };

  return (
    <div className={"overflow-hidden w-[600] h-[380px]"}>
      <div className={"flex justify-between m-2"}>
        <button
          className={
            "transition-transform bg-blue-500 px-4 py-2 rounded-md text-white"
          }
          onClick={""}
        >
          Previous
        </button>{" "}
        <button
          className={
            "transition-transform bg-blue-500 px-4 py-2 rounded-md text-white"
          }
          onClick={handleLoadNext}
        >
          Next
        </button>
      </div>
      <Card show={isShowing} title={questions[currentQuestion]} />
    </div>
  );
}
