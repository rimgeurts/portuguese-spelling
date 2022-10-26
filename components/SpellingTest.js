import React, {useEffect, useState} from "react";
import {wordList} from "./WordList";
import {CheckCircleIcon} from "@heroicons/react/24/outline";
import ResultModal from "./ResultModal";

function SpellingTest(props) {
    const [words, setWords] = useState(wordList);
    const [openResultsModal, setOpenResultsModal] = useState(false)
    const [currentWordIndex, setCurrentWordIndex] = useState(12);
    const [answer, setAnswer] = useState("");
    const [isCorrect, setIsCorrect] = useState(null);
    const [score, setScore] = useState(0)
    const [totalQuestionsNo, setTotalQuestionsNo] = useState(0)

    const handlePickRandomWord = () => {
        const randomIndex = Math.floor(Math.random() * wordList.length);
        setCurrentWordIndex(randomIndex);
    };

    useEffect(() => {
        const currentWord = words[currentWordIndex].portguese;
        const currentEnglishWord = words[currentWordIndex].english;
        console.log({answer, currentWord, currentEnglishWord}, currentWord === answer);
    }, [currentWordIndex])

    const handleSubmit = (e) => {
        e.preventDefault();
        setOpenResultsModal(true)
        const currentWord = words[currentWordIndex].portguese;
        console.log({answer, currentWord}, currentWord === answer);

        const isAnswerCorrect = currentWord === answer
        isAnswerCorrect ? setIsCorrect(true) : setIsCorrect(false);
        isAnswerCorrect && incrementScore()
        incrementTotalQuestions()
    };

    const incrementTotalQuestions = () => {
        setTotalQuestionsNo((prevTotalQuestionsNo) => prevTotalQuestionsNo + 1)
    }

    const incrementScore = () => {
        setScore((prevScore) => prevScore + 1)
    }

    const handleSkipWord = () => {
        handlePickRandomWord()
    }


    const handleLoadNextQuestion = () => {
        setOpenResultsModal(false)

        handlePickRandomWord()
        setAnswer('')
    }

    return (
        <>
            <ResultModal title={'Correct Answer'} isCorrect={isCorrect} answer={answer} loadNextQuestion={handleLoadNextQuestion} openResultsModal={openResultsModal} correctAnswer={words[currentWordIndex].portguese}/>
            <div className={'pb-10'}>
                <div className={"flex justify-between p-4 "}>
                    <div className={`text-xl font-medium px-6 py-3 rounded-md font-medium bg-pink-600 shadow-lg text-white`}>Score {score} out of {totalQuestionsNo}</div>
                    <button
                        onClick={handleSkipWord}
                        type="button"
                        className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Skip Word
                    </button>
                </div>
                <div className="flex flex-col items-center justify-center">

                    <div className="text-6xl font-bold">{words[currentWordIndex].english}</div>
                </div>
                <form onSubmit={handleSubmit} className="mt-10">
                    <div className="flex justify-center ">
                        <label htmlFor="text" className="block text-sm font-medium text-gray-700"></label>
                        <div className="relative mt-1">
                            <input
                                autoComplete="off"
                                type="text"
                                name="text"
                                id="text"
                                className="block w-full text-center border-2 border-gray-500 border-dashed rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-6xl"
                                onChange={(event) => setAnswer(event.target.value)}
                                value={answer}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center mt-10">
                        <button
                            type="submit"
                            className="inline-flex items-center px-6 py-3 my-2 text-xl font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default SpellingTest;
