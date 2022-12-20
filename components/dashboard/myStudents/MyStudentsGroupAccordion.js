import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, UsersIcon } from "@heroicons/react/20/solid";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  useGetUserGroupsQuery,
  useUpdateUserGroupByIdMutation,
} from "../../../redux/apis/strapi";
import { generateGetAllQuizzesQuery } from "../../util/generateGetAllQuestionsQuery";
import GroupMemberLine from "../GroupMemberLine";
import InviteNewGroupMember from "../InviteNewGroupMember";

function sortArray(array, sortKey) {
  const newArray = [...array];
  const sortedArray = newArray.sort((a, b) => {
    const keyA = new Date(a[sortKey]);
    const keyB = new Date(b[sortKey]);
    // Compare the 2 dates
    if (keyA > keyB) {
      return -1;
    }
    if (keyA < keyB) {
      return 1;
    }
    return 0;
  });
  return sortedArray;
}

export default function MyStudentsGroupAccordion() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(generateGetAllQuizzesQuery(search));
  const [updateUserGroup, updateUserGroupStatus] =
    useUpdateUserGroupByIdMutation();
  const {
    data: groups,
    error,
    isLoading,
    refetch: refetchGroups,
  } = useGetUserGroupsQuery(undefined, { skip: !session });

  console.log({ groups });
  const onRemoveUserFromGroup = (selectedMember, selectedGroupId, event) => {
    console.log("removing user from group", {
      selectedMember,
      selectedGroupId,
    });
    console.log({ groups });

    const selectedGroup = groups.data.find(
      (group) => group.id === selectedGroupId
    );
    console.log({ selectedGroup });
    const newMembers = [];

    selectedGroup.members.map((member, index) => {
      if (member.id !== selectedMember.id) {
        newMembers.push(member.id);
      }
    });

    console.log({ newMembers });

    const payload = {
      id: selectedGroup.id,
      data: {
        members: newMembers,
      },
    };

    updateUserGroup(payload);
  };

  return (
    <div className="w-full h-full ">
      <div className="mx-auto w-full  rounded-2xl bg-white p-2 h-full overflow-y-auto">
        {groups?.data.map((group) => {
          return (
            group.groupName !== "Everyone" && (
              <div key={group.id} className={"mt-2 "}>
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full justify-between items-center rounded-lg bg-gray-50 px-4 py-4 text-left text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
                        <div className={"flex items-center gap-2"}>
                          <UsersIcon className={"h-8 w-8 text-gray-300"} />
                          {group.groupName}
                        </div>

                        <ChevronUpIcon
                          className={`${
                            open ? "rotate-180 transform" : ""
                          } h-5 w-5 text-gray-500`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-12  text-sm text-gray-500">
                        <div className={"w-full py-2"}>
                          <div className={"bg-white rounded-lg "}>
                            <div className={"mb-2"}>
                              <InviteNewGroupMember
                                refetchGroups={refetchGroups}
                                group={group}
                              />
                            </div>
                            {sortArray(group.members, "createdAt").map(
                              (member) => {
                                return (
                                  <GroupMemberLine
                                    groupId={group.id}
                                    key={member.id}
                                    member={member}
                                    onRemoveUserFromGroup={
                                      onRemoveUserFromGroup
                                    }
                                  />
                                );
                              }
                            )}
                          </div>
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}
