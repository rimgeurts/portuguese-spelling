import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import MyStudentsGroupAccordion from "../../../components/dashboard/student/MyStudentsGroupAccordion";
import MyQuizTabs from "../../../components/dashboard/teacher/MyQuizTabs";
import IconTeacher from "../../../components/ui/icons/IconTeacher";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import { generateGetAllQuizzesQuery } from "../../../components/util/generateGetAllQuestionsQuery";
import searchUserEmailInGroupArray from "../../../components/util/searchUserEmailInGroupArray";
import sortArray from "../../../components/util/sortArray";
import {
  useAddResultsMutation,
  useAddUserGroupMutation,
  useGetUserGroupsQuery,
} from "../../../redux/apis/strapi";
import { selectUI, updateUIState } from "../../../redux/slices/uiSlice";

function Index(props) {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: { searchMembers: "" },
  });
  const {
    myQuizzesSearch,
    myQuizzesCurrentPage,
    myQuizzesSearchQuery,
    myStudentsIsNewGroupAdded,
  } = useSelector(selectUI);
  const { data: session, status } = useSession();

  const [selectedTab, setSelectedTab] = useState();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(
    generateGetAllQuizzesQuery(myQuizzesSearch, myQuizzesCurrentPage)
  );
  const [addUserGroup, addUserGroupStatus] = useAddUserGroupMutation();

  const [addResultsStrapi, addResultStrapiStatus] = useAddResultsMutation();

  const {
    data: groups,
    error: groupsError,
    isLoading: groupsLoading,
    refetch: refetchGroups,
  } = useGetUserGroupsQuery(undefined, { skip: !session });

  const watchSearchMembers = watch("searchMembers");
  const [filteredGroups, setFilteredGroups] = useState(groups);

  // filter groups based on search value
  useEffect(() => {
    if (!groups) {
      return;
    }
    const newFilteredGroups = searchUserEmailInGroupArray(
      groups,
      watchSearchMembers
    );
    const sortedFilteredGroups = sortArray(newFilteredGroups.data, "createdAt");
    setFilteredGroups({ data: sortedFilteredGroups });
  }, [watchSearchMembers, groups]);

  // refetch groups with new search results
  useEffect(() => {
    const query = generateGetAllQuizzesQuery(
      myQuizzesSearch,
      myQuizzesCurrentPage
    );
    dispatch(updateUIState({ myQuizzesSearchQuery: query }));
    setQuery(query);
  }, [myQuizzesSearch, myQuizzesCurrentPage]);

  const addGroup = async () => {
    const { data } = await addUserGroup({ data: {} });
  };

  return (
    <div className={"h-[80vh] px-6"}>
      <div className="md:flex md:items-center md:justify-between mt-2">
        <div className="min-w-0 flex items-center justify-center gap-3">
          <div className={"p-4 bg-blue-50 rounded-full"}>
            <div className={" fill-blue-500 flex items-center justify-center"}>
              <div className={"w-10 h-10"}>
                <IconTeacher />
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            My Classroom
          </h2>
        </div>
        <div className={"flex items-center gap-2"}>
          <div className="relative w-full max-w-xs">
            <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center pl-2">
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-300 stroke-2" />
            </div>
            <input
              autoComplete={"off"}
              {...register("searchMembers")}
              onChange={(e) => {
                setValue("searchMembers", e.target.value);
              }}
              className="pl-12  placeholder-gray-300 w-full rounded-xl border-gray-200 hover:border-gray-200 py-3 pr-3  focus:border focus:border-blue-500 focus:placeholder-gray-400 focus:outline-none  focus:ring-blue-500"
              placeholder="Search for email"
              type="search"
            />
          </div>
          <button
            onClick={addGroup}
            type="submit"
            className="whitespace-nowrap inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-3 text-sm font-medium leading-4 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add New Group
          </button>
        </div>
      </div>
      <div className={"  mt-2"}>
        <div className={` rounded-lg text-gray-400 font-semibold `}>
          <MyQuizTabs>
            {groupsLoading ? (
              <LoadingSpinner />
            ) : (
              <MyStudentsGroupAccordion
                groups={filteredGroups}
                refreshGroups={refetchGroups}
                search={watchSearchMembers}
              />
            )}
          </MyQuizTabs>
        </div>
      </div>
    </div>
  );
}

export default Index;
