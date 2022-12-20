import { EnvelopeIcon, UserIcon } from "@heroicons/react/24/solid";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useInviteGroupMemberMutation,
  useUpdateUserGroupByIdMutation,
} from "../../redux/apis/strapi";

export default function ManageGroupAccess({ selectedGroup }) {
  const [updateUserGroup, updateUserGroupStatus] =
    useUpdateUserGroupByIdMutation();
  const [inviteGroupMember, inviteGroupMemberStatus] =
    useInviteGroupMemberMutation();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, event) => {
    event.preventDefault();
    const { invite } = data;
    const response = await inviteGroupMember({
      data: {
        email: invite,
        quizAccess: [69],
        groupId: selectedGroup.id,
      },
    });
    //reset();
  };

  const onRemoveUserFromGroup = (userIndex) => {
    const newMembers = [];

    selectedGroup.members.map((member, index) => {
      if (index !== userIndex) {
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

  useEffect(() => {
    console.log({ selectedGroup });
  }, []);

  return (
    selectedGroup?.groupName !== "Everyone" && (
      <>
        <div className="mt-8">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Invite new group member
          </label>

          <div className="relative mt-1 rounded-lg shadow-sm">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
              aria-hidden="true"
            >
              <EnvelopeIcon
                className="mr-3 h-4 w-4 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <form className={"flex gap-2"} onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("invite")}
                type="email"
                placeholder="info@example.com"
                className="py-3 block w-full rounded-lg border-gray-300 pl-9 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              <button
                type="submit"
                className="whitespace-nowrap inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Send Invite
              </button>
            </form>
          </div>
        </div>
        <div>
          <div
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mt-8 mb-2"
          >
            {selectedGroup?.groupName} members:
          </div>
          <ul
            role="list"
            className="divide-y divide-gray-200 h-[200px] overflow-y-scroll"
          >
            {selectedGroup?.members.map((member, memberIndex) => (
              <li key={member.id} className="flex py-4 justify-between mx-4">
                <div className={"flex"}>
                  <UserIcon className={"w-10 h-10 mr-1 fill-gray-300"} />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">
                      {member.confirmed ? (
                        <div>{member.firstname + " " + member.lastname}</div>
                      ) : (
                        <div
                          className={
                            "bg-gray-100 rounded-md text-gray-700 px-1.5 py-1 text-xs"
                          }
                        >
                          Awaiting email confirmation
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{member.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveUserFromGroup(memberIndex)}
                  type="button"
                  className="inline-flex items-center rounded border border-transparent bg-blue-100 px-2.5 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  );
}
