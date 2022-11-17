import React, {useEffect, useState} from "react";
import {wordList} from "./WordList";
import {
    useGetAllQuestionsForQuizQuery,
    useGetAllQuizzesQuery,
    useGetResultsByIdQuery, useUpdateResultsByIdMutation,
} from "../redux/apis/strapi";
import {useRouter} from "next/router";
import {generateGetAllQuestionsQuery} from "./util/generateGetAllQuestionsQuery";
import {getSpecialCharacters} from "./util/getSpecialCharacters";
import {useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import {selectUI} from "../redux/slices/uiSlice";

function SpellingTest() {
    const router = useRouter();
    const quizId = router.query.id;
    const [pageNumber, setPageNumber] = useState(0);
    const query = generateGetAllQuestionsQuery(quizId, pageNumber);
    const specialCharacters = getSpecialCharacters();
    const {activeQuizResultsId} = useSelector(selectUI);

    const {
        data: questions,
        error,
        isLoading,
    } = useGetAllQuestionsForQuizQuery({query}, {skip: !quizId});

    const {data: results} = useGetResultsByIdQuery(
        {id: activeQuizResultsId},
        {skip: !activeQuizResultsId}
    );
    const [updateResults, updateResultStatus] = useUpdateResultsByIdMutation();
    const currentQuestionNo = questions?.meta.pagination.page;
    const totalQuestions = questions?.meta.pagination.total;
    const question = questions?.data[0];
    const answer = question?.attributes.answers.data[0];
    console.log({questions});

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm();

    const onSubmit = (answerInput) => {
        console.log({answer}, answerInput);
        const payload = {
            id: activeQuizResultsId,
            data: {
                questionId: question.id,
                answerId: answer.id,
                answerInput,
            }
        }
        updateResults(payload)
    };

    const handleAddSpecialCharacter = (specialCharacter) => {
        setAnswer((prevAnswer) => prevAnswer.concat(specialCharacter));
    };

    return (
        <div className={"p-4"}>
            <div className={"mx-auto max-w-7xl sm:px-6 lg:px-8"}>
                <div
                    className={
                        "flex justify-between border-b-2 border-dashed border-gray-200"
                    }
                >
                    <div
                        className={`sm:px-0 sm:py-3 px-3 py-1 rounded-md  sm:text-3xl text-lg  text-gray-400  `}
                    >
                        Score:{" 100%"}
                    </div>
                    <div
                        className={`sm:px-0 sm:py-3 px-3 py-1 rounded-md  sm:text-3xl text-lg  text-gray-400  `}
                    >
                        Question: {currentQuestionNo} / {totalQuestions}
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center mt-6">
                    <div className="sm:text-6xl text-4xl font-bold text-gray-900">
                        {question?.attributes.title}
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="sm:mt-10 mt-6">
                    <div className="w-full ">
                        <label
                            htmlFor="text"
                            className="block text-sm font-medium text-gray-700 "
                        ></label>
                        <div className="relative mt-1">
                            <input
                                autoComplete="off"
                                type="text"
                                {...register("answerInput")}
                                className=" leading-10 block w-full text-gray-900 text-center border-2 border-gray-200 border-dashed rounded-md shadow-sm focus:border-dashed focus:border-blue-500 sm:text-6xl"
                            />
                        </div>
                    </div>
                    <div
                        className={
                            "sm:text-4xl text-2xl flex sm:gap-2 gap-1 justify-center mt-4 flex-wrap"
                        }
                    >
                        {specialCharacters.map(
                            (specialCharacter, specialCharacterIndex) => {
                                return (
                                    <div
                                        onClick={() => handleAddSpecialCharacter(specialCharacter)}
                                        className={
                                            "sm:w-[50px] sm:p-2 p-1 w-[30px] border-2 border-blue-500 rounded-md bg-blue-100 text-blue-500 text-center hover:bg-blue-200 cursor-pointer select-none"
                                        }
                                        key={specialCharacter}
                                    >
                                        {specialCharacter}
                                    </div>
                                );
                            }
                        )}
                    </div>
                    <div className="flex justify-center sm:mt-10 mt-10">
                        <button
                            type="submit"
                            className="inline-flex items-center sm:px-6 px-3 sm:py-3 py-2 my-2 sm:text-xl sm:font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SpellingTest;
