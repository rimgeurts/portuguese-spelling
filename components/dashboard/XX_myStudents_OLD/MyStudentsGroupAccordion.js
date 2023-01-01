import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import {
  useDeleteUserGroupMutation,
  useUpdateUserGroupByIdMutation,
} from "../../../redux/apis/strapi";
import ConfirmationModal from "../../ui/ConfirmationModal";
import sortArray from "../../util/sortArray";
import GroupMemberLine from "../teacher/GroupMemberLine";
import InviteNewGroupMember from "../teacher/InviteNewGroupMember";
import GroupAccordionTitle from "./GroupAccordionTitle";

export default function MyStudentsGroupAccordion({
  groups,
  refreshGroups,
  search,
  isNewGroupAdded,
}) {
  const [openDeleteGroupModal, setOpenDeleteGroupModal] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [updateUserGroup, updateUserGroupStatus] =
    useUpdateUserGroupByIdMutation();
  const [deleteGroup, deleteGroupStatus] = useDeleteUserGroupMutation();

  const onRemoveUserFromGroup = (selectedMember, selectedGroupId, event) => {
    console.log("removing user from group", {
      selectedMember,
      selectedGroupId,
    });

    const selectedGroup = groups.data.find(
      (group) => group.id === selectedGroupId
    );
    const newMembers = [];

    selectedGroup.members.map((member, index) => {
      if (member.id !== selectedMember.id) {
        newMembers.push(member.id);
      }
    });

    const payload = {
      id: selectedGroup.id,
      data: {
        members: newMembers,
      },
    };

    updateUserGroup(payload);
  };

  const onOpenDeleteConfirmationModal = (groupId) => {
    setOpenDeleteGroupModal(true);
    setSelectedGroupId(groupId);
  };

  const onDeleteGroup = () => {
    deleteGroup({ id: selectedGroupId, data: {} });
    setOpenDeleteGroupModal(false);
  };

  return (
    <div className="w-full h-full ">
      <ConfirmationModal
        open={openDeleteGroupModal}
        confirmationButtonName={"Delete Group"}
        title={"Delete Group"}
        setOpen={setOpenDeleteGroupModal}
        action={onDeleteGroup}
      >
        Are you sure you want to delete this group?
      </ConfirmationModal>
      <div className="mx-auto w-full  rounded-2xl bg-white p-2 h-full overflow-y-auto">
        {groups?.data.map((group) => {
          return (
            group.groupName !== "Everyone" && (
              <div key={group.id} className={"mt-2"}>
                <Disclosure defaultOpen={true}>
                  {({ open }) => {
                    return (
                      <>
                        <div
                          className={
                            "flex w-full justify-between items-center rounded-lg bg-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-500 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75"
                          }
                        >
                          <GroupAccordionTitle group={group} />
                          <Disclosure.Button className="">
                            <div className={"flex items-center"}>
                              <div
                                onClick={() =>
                                  onOpenDeleteConfirmationModal(group.id)
                                }
                                className={
                                  "flex p-2 bg-gray-300 hover:bg-gray-400 rounded-full text-white  border mr-8 "
                                }
                              >
                                <TrashIcon className={"h-6 w-6 "} />
                              </div>
                              <div
                                className={"p-2 rounded-full hover:bg-gray-100"}
                              >
                                <ChevronUpIcon
                                  className={`${
                                    open ? "rotate-180 transform" : ""
                                  } h-6 w-6 text-gray-500 hover:text-gray-700`}
                                />
                              </div>
                            </div>
                          </Disclosure.Button>
                        </div>
                        <Disclosure.Panel className="px-12  text-sm text-gray-500 bg-gray-50 rounded-b-lg">
                          <div className={"w-full py-2"}>
                            <div className={"rounded-lg "}>
                              <div className={"mb-2"}>
                                <InviteNewGroupMember
                                  refetchGroups={refreshGroups}
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
                    );
                  }}
                </Disclosure>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}
