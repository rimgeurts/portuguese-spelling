import { UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";

export default function GroupMemberLine(props) {
  return (
    <div
      className={`flex justify-between items-center not-last:border-b border-gray-100 py-4 px-8 select-none `}
    >
      <div
        className={
          "cursor-pointer  text-gray-800 hover:font-semibold hover:border-gray-300 hover:text-gray-700 "
        }
      >
        <Link href={`/quiz/${props.member.id}`}>
          <div className={"flex items-center"} onClick={props.onClick}>
            <UserIcon className={"w-12 h-12 mr-2 fill-gray-300"} />
            <div className={""}>
              <div>{props.member.firstname + " " + props.member.lastname}</div>
              <div className={"text-gray-400"}>{props.member.email}</div>
            </div>
          </div>
        </Link>
      </div>
      <div className={"flex gap-[20px] items-center"}>
        <Link href={`/create/`}>
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Remove
          </button>
        </Link>
      </div>
    </div>
  );
}
