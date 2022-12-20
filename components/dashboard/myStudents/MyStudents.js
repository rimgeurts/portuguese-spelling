import { UserIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useGetUserGroupsQuery } from "../../../redux/apis/strapi";
import { generateGetAllQuizzesQuery } from "../../util/generateGetAllQuestionsQuery";

function MyStudents() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(generateGetAllQuizzesQuery(search));
  const {
    data: groups,
    error,
    isLoading,
  } = useGetUserGroupsQuery(undefined, { skip: !session });

  return (
    <div
      className={
        "font-medium text-sm   text-gray-500 hover:text-gray-700 overflow-y-auto h-full w-full mx-4"
      }
    >
      {groups?.data.map((group) => {
        return (
          <div key={group.id} className={"flex flex-col justify-center"}>
            {group.groupName}
            {group.members.map((member) => {
              return (
                <div
                  key={member.id}
                  className={
                    "grid grid-cols-12  border-b border-gray-100 py-4 flex items-center"
                  }
                >
                  <div className={"col-span-5 flex items-center"}>
                    <UserIcon className={"h-10 w-10 mr-2 text-gray-300"} />
                    <div>
                      <div>{member.firstname + " " + member.lastname}</div>
                      <div className={"text-xs  text-gray-400 "}>
                        {member.email}
                      </div>
                    </div>
                  </div>
                  <div className={"col-span-5 flex items-center"}>
                    {/*<UsersIcon className={"h-4 w-4 mr-1 text-gray-300"} />*/}
                    {/*<div>{group.groupName}</div>*/}
                  </div>
                  <div className={"col-span-2 flex justify-center"}>
                    <button className="inline-flex items-center rounded-md border border-transparent bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                      <div className={""}>Remove</div>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default MyStudents;
