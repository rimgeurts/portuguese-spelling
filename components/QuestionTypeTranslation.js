import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUI,
  addQuestions,
  updateQuestion,
  updateAnswer,
  updateActiveQuestionId,
  updateActiveAnswerId,
  updateActiveQuestionIndex,
  updateActiveAnswerIndex,
} from "../redux/slices/uiSlice";
import {
  useGetQuizByIdQuery, useUpdateAnswerMutation,
  useUpdateQuestionMutation,
  useUpdateQuizMutation,
} from "../redux/apis/strapi";
import qs from "qs";
import useOnClickOutside from "./hooks/useClickOutside";

export default function QuestionTypeTranslation() {
  const questionRef = useRef();
  const answerRef = useRef();
  const [initialLoad, setInitialLoad] = useState(true);
  const dispatch = useDispatch();
  const [updateQuestionStrapi, updateQuestionStrapiStatus] =
    useUpdateQuestionMutation();
  const [updateAnswerStrapi, updateAnswerStrapiStatus] =
    useUpdateAnswerMutation();
  const {
    selectedQuizId,
    questions,
    activeQuestionId,
    activeAnswerId,
    activeQuestionIndex,
    activeAnswerIndex,
  } = useSelector(selectUI);
  const {
    data: quiz,
    error,
    isLoading,
  } = useGetQuizByIdQuery({ selectedQuizId }, { skip: !selectedQuizId });

  useOnClickOutside(questionRef, () => uploadQuestionToStrapi());
  useOnClickOutside(answerRef, () => uploadAnswerToStrapi());
  console.log({quiz})

  useEffect(() => {
    if (!quiz) {
      return;
    }
    console.log({ quiz });
    dispatch(addQuestions({ questions: quiz.attributes.questions }));


  }, [quiz]);


  useEffect(() => {
    if (questions.length === 0) {
      return;
    }

    if(!initialLoad) {
      return
    }

    console.log('quizID is selected we can now load the questions')
    dispatch(
        updateActiveQuestionId({ activeQuestionId: questions.data[0].id})
    );
    dispatch(
        updateActiveQuestionIndex({
          activeQuestionIndex: 0,
        }))
    setInitialLoad(true);
  }, [questions])

  const handleSubmitQuestion = () => {};

  const handleSubmitAnswer = () => {};

  const uploadQuestionToStrapi = () => {
    const payload = {
      id: activeQuestionId,
      data: {
        title: questions.data[activeQuestionIndex].attributes.title,
        quiz: [selectedQuizId],
      },
      meta: {},
    };
    updateQuestionStrapi(payload);
  };
  const uploadAnswerToStrapi = () => {
    const payload = {
      id: activeAnswerId,
      data: {
        title: questions.data[activeQuestionIndex].attributes.answers.data[activeAnswerIndex].attributes.title,
        quiz: [selectedQuizId],
        question: [activeQuestionId],
      },
      meta: {},
    };
    updateAnswerStrapi(payload);
  };

  const handleQuestionChange = (e, questionIndex) => {
    dispatch(
      updateQuestion({
        questionIndex,
        questionTitle: e.target.value,
      })
    );
  };
  const handleAnswerChange = (e, questionIndex, answerIndex) => {
    dispatch(
      updateAnswer({
        questionIndex,
        answerIndex,
        answerTitle: e.target.value,
      })
    );
  };

  return (
    <div onSubmit={handleSubmitQuestion} className={"flex flex-col gap-4"}>
      {questions?.data?.map((question, questionIndex) => {
        const answers = question.attributes.answers.data;
        return (
          <Fragment key={question.id}>
            <form ref={questionRef}>
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-gray-700"
              >
                Question
              </label>
              <div className="mt-1">
                <textarea
                  rows={4}
                  name="comment"
                  id="comment"
                  className="block w-full rounded-md border-dashed border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={question.attributes.title}
                  onChange={(e) => handleQuestionChange(e, questionIndex)}
                  onClick={() => {

                  }}
                />
              </div>
            </form>
            {answers.map((answer, answerIndex) => {
              return (
                <form
                  ref={answerRef}
                  key={answer.id}
                  onSubmit={handleSubmitAnswer}
                >
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Answer
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    <textarea
                      rows={4}
                      name="comment"
                      id="comment"
                      className="block w-full rounded-md border-dashed border-2 border-gray-300 shadow-sm focus:border-blue-500  sm:text-sm"
                      value={answer.attributes.title}
                      onChange={(e) =>
                        handleAnswerChange(e, questionIndex, answerIndex)
                      }
                      onClick={() => {
                        dispatch(
                          updateActiveAnswerId({ activeAnswerId: answer.id })
                        );
                        dispatch(
                          updateActiveAnswerIndex({
                            activeAnswerIndex: answerIndex,
                          })
                        );
                        setIsAnswerFormEnabled(true);
                      }}
                    />
                  </div>
                </form>
              );
            })}
          </Fragment>
        );
      })}
    </div>
  );
}
