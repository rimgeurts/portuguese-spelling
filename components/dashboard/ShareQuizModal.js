import { Dialog, Transition } from "@headlessui/react";
import { UsersIcon } from "@heroicons/react/20/solid";
import { ShareIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useGetUserGroupsQuery,
  useUpdateQuizMutation,
} from "../../redux/apis/strapi";
import { generateGetAllQuizzesQuery } from "../util/generateGetAllQuestionsQuery";
import LinkSharingOptions from "./LinkSharingOptions";
import ManageGroupAccess from "./ManageGroupAccess";
import { QuizLink } from "./QuizLink";

export default function ShareQuizModal({ quizId, quiz }) {
  const [open, setOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(generateGetAllQuizzesQuery(search));
  const {
    data: groups,
    error,
    isLoading,
  } = useGetUserGroupsQuery(undefined, { skip: !session });
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [updateQuiz, updateQuizResults] = useUpdateQuizMutation();

  useEffect(() => {
    if (!groups?.data) {
      return;
    }
    //  setSelectedGroup(groups?.data[selectedGroupId]);
  }, [groups]);

  useEffect(() => {
    const quizUserGroup = quiz.attributes.userGroups.data.filter(
      (group) => group.attributes.groupName !== "Administrators"
    );

    const initialSelectedGroup = groups?.data.find(
      (group) => group.id === quizUserGroup[0]?.id
    );
    setSelectedGroup(initialSelectedGroup);
    console.log({ initialSelectedGroup });
  }, [quiz, groups]);

  useEffect(() => {
    console.log({ groups });
    console.log({ selectedGroup });
  }, [selectedGroup]);

  const onSelectedGroup = (value) => {
    console.log("setting selected group to: ", value);
    const payload = {
      id: quizId,
      data: {
        userGroups: [value.id],
      },
    };
    updateQuiz(payload);
    const index = groups.data.findIndex((group) => group.id === value.id);
    setSelectedGroup(value);
  };

  console.log({ quiz });
  return (
    <>
      {selectedGroup && (
        <div className={""}>
          <div className={"flex text-xs  text-gray-400 items-center"}>
            <UsersIcon className={"w-4 h-4 mr-1 text-gray-400 "} />
            Shared with:
            <button
              onClick={() => setOpen(!open)}
              type="button"
              className=" inline-flex  rounded-md border border-transparent  pl-1 py-2 text-xs  text-gray-600 underline hover:font-semibold hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {selectedGroup?.groupName || "None"}
            </button>
          </div>
          <Transition.Root show={open} as={Fragment}>
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
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-md transition-opacity" />
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
                    <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 h-[80vh]">
                      <div className={"flex flex-col h-full"}>
                        <div className={"flex items-start justify-between"}>
                          <div className="flex items-start text-start pr-2">
                            <Dialog.Title as="h3" className="text-left">
                              <div
                                className={
                                  "text-2xl font-medium text-gray-900 "
                                }
                              >
                                Share your Quiz
                              </div>
                              <p className="text text-gray-500">
                                Invite other users to take this quiz!
                              </p>
                            </Dialog.Title>
                          </div>
                          <div className="bg-blue-50 h-[100px] w-[100px] rounded-full flex items-center justify-center">
                            <ShareIcon
                              className="h-12 w-12 text-blue-400 stroke-[2px]"
                              aria-hidden="true"
                            />
                          </div>
                        </div>

                        <div className={"flex-1"}>
                          <QuizLink quizId={quizId} />
                          <div className={"mt-4"}>
                            <LinkSharingOptions
                              groups={groups}
                              selectedGroup={selectedGroup}
                              onSelectedGroup={onSelectedGroup}
                            />
                          </div>
                          <div className={"mt-4"}>
                            <ManageGroupAccess selectedGroup={selectedGroup} />
                          </div>
                        </div>

                        <div className="mt-5 sm:mt-6">
                          <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-sm"
                            onClick={() => setOpen(false)}
                          >
                            Go back to dashboard
                          </button>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </div>
      )}
    </>
  );
}
