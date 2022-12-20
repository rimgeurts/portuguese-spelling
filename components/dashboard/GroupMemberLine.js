import { EnvelopeIcon, UserIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useForm } from "react-hook-form";

export default function GroupMemberLine({
  onClick,
  member,
  onRemoveUserFromGroup,
  groupId,
}) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const { confirmedWithBearerToken } = member;
  const onSubmit = async (data, event) => {
    event.preventDefault();
    const { invite } = data;
    const response = await inviteGroupMember({
      data: {
        email: invite,
        quizAccess: [69],
        groupId: blueedGroup.id,
      },
    });
    //reset();
  };

  return (
    <div
      className={
        " text-sm font-medium text-gray-500 not-last:border-b border-gray-100 py-4 "
      }
    >
      <div
        className={"grid grid-cols-12 flex items-center gap-4"}
        onClick={onClick}
      >
        <div className={"inline-flex col-span-10"}>
          <div className={"p-2 rounded-full bg-gray-50 mr-2"}>
            <UserIcon className={"w-9 h-9 fill-gray-200"} />
          </div>
          <div className={""}>
            {confirmedWithBearerToken ? (
              <div>{member.firstname + " " + member.lastname}</div>
            ) : (
              <div class="inline-flex items-center justify-center text-xs rounded text-white bg-gray-500 p-1">
                <EnvelopeIcon className={"w-3 h-3 mr-1"} />
                <div>Awaiting email confirmation</div>
              </div>
            )}

            <div className={"font-normal text-gray-400"}>{member.email}</div>
          </div>
        </div>
        <div className={"flex items-center justify-end col-span-2 ml-1"}>
          <button
            onClick={(event) => onRemoveUserFromGroup(member, groupId)}
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
