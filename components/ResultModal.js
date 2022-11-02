import React, {Fragment, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {CheckIcon, XMarkIcon} from '@heroicons/react/24/outline'

export default function ResultModal({title, loadNextQuestion, openResultsModal, isCorrect, answer, correctAnswer}) {
    const [open, setOpen] = useState(true)


    return (<Transition.Root show={openResultsModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <Dialog.Panel
                            className="relative transform overflow-hidden rounded-lg bg-white px-14 pb-4 pt-10  text-left shadow-xl transition-all">
                            <form onSubmit={() => {
                            }}>
                                <div>

                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3"
                                                      className="text-2xl font-medium leading-6 text-gray-900">

                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <div className="flex items-center ">

                                                {isCorrect ? <div
                                                    className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-green-600 border-green-500 border-2 mr-3">
                                                    <CheckIcon className="h-6 w-6 text-white"/></div> : <div
                                                    className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-red-600 border-red-500 border-2 mr-3">
                                                    <XMarkIcon className="h-6 w-6 text-white "/></div>}

                                                {isCorrect ? (<div className="flex items-center py-2 ">
                                                    <p>
                                                                <span
                                                                    className="text-4xl font-bold ">{answer} </span> was
                                                        &nbsp
                                                        the correct answer!
                                                    </p>
                                                </div>) : (<p>
                                                    <span className="text-2xl font-semibold">{answer} </span>
                                                    is not correct. The correct answer should be &nbsp;
                                                    <span
                                                        className="text-4xl font-bold ">{correctAnswer} </span>
                                                </p>)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-14">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:2xl:"
                                        onClick={loadNextQuestion}
                                    >
                                        Next Question
                                    </button>
                                </div>
                            </form>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition.Root>)
}