import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import GroupMemberLine from "../../components/dashboard/GroupMemberLine";
import InviteNewGroupMember from "../../components/dashboard/InviteNewGroupMember";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import { generateGetAllQuizzesQuery } from "../../components/util/generateGetAllQuestionsQuery";
import { useGetUserGroupsQuery } from "../../redux/apis/strapi";

function Index(props) {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(generateGetAllQuizzesQuery(search));

  const {
    data: groups,
    error,
    isLoading,
  } = useGetUserGroupsQuery({ skip: !session });

  console.log({ groups });

  useEffect(() => {
    setQuery(generateGetAllQuizzesQuery(search));
  }, [search]);

  if (isLoading) {
    return <LoadingSpinner minHeight={"h-[80vh]"} />;
  }

  return (
    <div className={"h-[80vh]"}>
      <div>
        <div
          className={
            "px-4 py-4 rounded-t-md mb-2 text-xl text-gray-800 flex items-center justify-start "
          }
        >
          <div className={"w-full "}>
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-300 stroke-2" />
              </div>
              <input
                autoComplete={"off"}
                id="search"
                name="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                className="pl-[55px]  block placeholder-gray-400/80 w-full rounded-xl border-gray-100 hover:border-gray-300/70 py-4 pl-10 pr-3 placeholder-gray-500 focus:border focus:border-blue-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Search"
                type="search"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={"h-[70vh] overflow-y-scroll w-full "}>
        {groups?.data?.map((group) => {
          return (
            <div
              key={group.id}
              className={"px-4 py-2 bg-gray-100 my-4 mx-4 rounded-lg mx-auto"}
            >
              <div className={"flex flex-col"}>
                <div className={"text-gray-700 py-4 font-semibold"}>
                  {group.groupName}
                </div>

                <div className={"ml-16"}>
                  <div className="mt-4">
                    <InviteNewGroupMember />
                  </div>

                  <div className={"w-full py-2"}>
                    <div
                      className={
                        "bg-white rounded-lg border border-gray-200 max-w-lg"
                      }
                    >
                      {group.members.map((member) => {
                        return (
                          <GroupMemberLine
                            key={member.id}
                            member={member}
                            onClick={() => console.log("clicked")}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Index;
