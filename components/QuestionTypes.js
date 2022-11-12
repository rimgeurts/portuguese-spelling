import {PlusIcon} from "@heroicons/react/24/outline";
import React from "react";

const notificationMethods = [
    { id: 'multi', title: 'Multiple Choice' },
    { id: 'single', title: 'Single Choice' },
    { id: 'essay', title: 'Open Question' },
    { id: 'true / false', title: 'True / False' },
]

export default function QuestionTypes() {
    return (
        <div className={'select-none'}>
            <label className="text-base font-medium text-gray-900">Question Type</label>
            <p className="text-sm leading-5 text-gray-500">Select your preferred question type?</p>
            <fieldset className="mt-4">
                <legend className="sr-only">Notification method</legend>
                <div className="sm:my-1 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                    {notificationMethods.map((notificationMethod) => (
                        <div key={notificationMethod.id} className="py-2 sm:py-0 flex items-center cursor-pointer">
                            <input
                                id={notificationMethod.id}
                                name="notification-method"
                                type="radio"
                                defaultChecked={notificationMethod.id === 'email'}
                                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            />
                            <label htmlFor={notificationMethod.id} className="ml-3 block text-sm font-medium text-gray-700 cursor-pointer">
                                {notificationMethod.title}
                            </label>
                        </div>
                    ))}
                </div>
            </fieldset>
        </div>
    );
}