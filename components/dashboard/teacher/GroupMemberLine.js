import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/solid";
import React from "react";

export default function GroupMemberLine({
  onClick,
  member,
  onRemoveUserFromGroup,
  groupId,
}) {
  const { confirmedWithBearerToken } = member;

  return (

      <div className={'bg-white max-w-lg py-4 pr-6 pl-3 rounded-lg shadow mb-4'}>
        <div
            className={
              ' text-sm font-medium text-gray-500 max-w-lg'
            }
        >
          <div
              className={'grid grid-cols-12 flex items-center gap-4'}
              onClick={onClick}
          >
            <div className={'inline-flex col-span-10'}>
              <div className={'p-2 rounded-full bg-gray-50 mr-2'}>
                <UserIcon className={'w-9 h-9 fill-gray-200'}/>
              </div>
              <div className={''}>
                {confirmedWithBearerToken ? (
                    <div>{member.firstname + ' ' + member.lastname}</div>
                ) : (
                    <div
                        className="inline-flex items-center justify-center rounded  p-1 mb-1">
                      <EnvelopeIcon className={'w-3 h-3 mr-1'}/>
                      <div>Awaiting email confirmation</div>
                    </div>
                )}

                <div className={'font-normal text-gray-400'}>{member.email}</div>
              </div>
            </div>
            <div className={'flex items-center justify-end col-span-2 ml-1'}>

              <button
                  onClick={(event) => onRemoveUserFromGroup(member, groupId)}
                  type="button"
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}
