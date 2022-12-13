import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

import {
  useAddResultsMutation,
  useGetAllLanguagesQuery,
  useGetAllQuizzesQuery,
} from "../../redux/apis/strapi";

import { selectUI } from "../../redux/slices/uiSlice";

function Index(props) {
  const router = useRouter();
  const { myQuizzesSearch, myQuizzesCurrentPage, myQuizzesSearchQuery } =
    useSelector(selectUI);
  const { data: session, status } = useSession();

  const {
    data: languages,
    error: languageError,
    isLoading: languageIsLoading,
  } = useGetAllLanguagesQuery();

  console.log({ languages });

  const [selectedTab, setSelectedTab] = useState();
  const {
    data: quizList,
    error,
    isLoading,
  } = useGetAllQuizzesQuery(
    { query: myQuizzesSearchQuery },
    { skip: !session }
  );
  const [addResultsStrapi, addResultStrapiStatus] = useAddResultsMutation();

  if (isLoading) {
    return <LoadingSpinner minHeight={"h-[80vh]"} />;
  }

  return (
    <div className={"h-[80vh] px-6"}>
      <div className="md:flex md:items-center md:justify-between py-4 ">
        <div className="min-w-0 flex flex-col justify-center ">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            My Profile
          </h2>
        </div>
        <div className="">
          <div className="flex justify-end">
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push("/");
              }}
              type="button"
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <div className={"  mt-2"}>
        <div className={` rounded-lg text-gray-400 font-semibold `}>
          <div className="pt-8">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Personal Information
              </h3>
              <p className="mt-1 text-sm font-normal text-gray-500">
                Please enter your account details and select a language you
                would like to learn.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  What language do you want to learn?
                </label>
                <div className="mt-1">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    {languages?.length > 0 &&
                      languages?.map((language) => {
                        return (
                          <option
                            className={"flex items-center"}
                            key={language.id}
                            value={language.name}
                          >
                            {language.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="password"
                    autoComplete="email"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password confirmation
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="password"
                    autoComplete="email"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
