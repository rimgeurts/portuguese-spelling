import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useForm } from "react-hook-form";
import {
  useInviteGroupMemberMutation,
  useUpdateUserGroupByIdMutation,
} from "../../redux/apis/strapi";

export default function InviteNewGroupMember({ group, refetchGroups }) {
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
        groupId: group.id,
      },
    });
    console.log(await response);
    //reset();
  };

  return (
    <div className={""}>
      <label
        htmlFor="email"
        className="block text-xs text-gray-600  items-end flex"
      >
        Invite members to join this group
        <InformationCircleIcon className={"h-5 w-5  text-gray-600 ml-1"} />
      </label>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-1 rounded-lg  w-full"
      >
        <div
          className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 "
          aria-hidden="true"
        >
          <EnvelopeIcon
            className="mr-3 h-4 w-4 text-gray-300"
            aria-hidden="true"
          />
        </div>
        <div className={"flex gap-2"}>
          <input
            {...register("invite")}
            type="email"
            autoComplete={"off"}
            className="py-3 block w-full rounded-lg border-gray-200 pl-9 focus:border-blue-500 focus:ring-blue-500 sm:text-sm  placeholder-gray-500 font-normal"
            placeholder="info@example.com"
          />
          <button
            type="submit"
            className="whitespace-nowrap inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Send Invite
          </button>
          <button
            onClick={(event) => refetchGroups()}
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-gray-400 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Refresh
          </button>
        </div>
      </form>
    </div>
  );
}
