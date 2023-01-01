import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { FormErrorMessage } from "../../components/ui/FormErrorMessage";

import {
  useGetAllLanguagesQuery,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "../../redux/apis/strapi";

import { selectUI } from "../../redux/slices/uiSlice";

function Index(props) {
  const router = useRouter();
  const query = router.query;
  const token = query?.token;
  const { myQuizzesSearch, myQuizzesCurrentPage, myQuizzesSearchQuery } =
    useSelector(selectUI);
  const { data: session, status } = useSession();
  const { data: profile, profileLoadingStatus } = useGetUserProfileQuery(
    undefined,
    {
      skip: !session,
    }
  );
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const {
    data: languages,
    error: languageError,
    isLoading: languageIsLoading,
  } = useGetAllLanguagesQuery();

  const [updateUserProfile, updateUserProfileStatus] =
    useUpdateUserProfileMutation();

  useEffect(() => {
    // attempt to sign-in using the token supplied in the url query
    (async () => {
      if (!token) {
        return;
      }
      const { ok } = await signIn("credentials", {
        redirect: false,
        token,
      });
    })();
  }, [token]);

  // load the user profile data from strapi
  useEffect(() => {
    if (!profile) {
      return;
    }
    setValue("firstname", profile.firstname);
    setValue("lastname", profile.lastname);
    setValue("language", profile.learningLanguage?.id);
  }, [profile]);

  useEffect(() => {
    if (!session) {
      return;
    }
    setValue("email", session.user.email);
  }, [session]);

  const onSubmit = async (
    { email, firstname, lastname, password, language },
    event
  ) => {
    event.preventDefault();

    const result = await updateUserProfile({
      email,
      firstname,
      lastname,
      password,
      learningLanguage: {
        id: language,
      },
      confirmedWithBearerToken: !!token,
    });
  };

  return (
    <form className={"h-[80vh] px-6"} onSubmit={handleSubmit(onSubmit)}>
      <div className="md:flex md:items-center md:justify-between py-4 ">
        <div className="min-w-0 flex flex-col justify-center ">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Create a new account
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
                    id="language"
                    name="language"
                    {...register("language", { required: true })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="">Please select language</option>
                    {languages?.length > 0 &&
                      languages?.map((language) => {
                        return (
                          <option
                            className={"flex items-center"}
                            key={language.id}
                            value={language.id}
                          >
                            {language.name}
                          </option>
                        );
                      })}
                  </select>
                  {errors.language && (
                    <FormErrorMessage
                      message={
                        "Please select a language you would like to learn"
                      }
                    />
                  )}
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
                    {...register("firstname", { required: true })}
                    type="text"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  {errors.firstname && (
                    <FormErrorMessage message={"required field"} />
                  )}
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
                    {...register("lastname", { required: true })}
                    autoComplete="family-name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  {errors.lastname && (
                    <FormErrorMessage message={"required field"} />
                  )}
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
                    {...register("email", {
                      required: true,
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Enter a valid e-mail address",
                      },
                    })}
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  {errors.email && (
                    <FormErrorMessage message={errors.email.message} />
                  )}
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
                    {...register("password", { required: true })}
                    type="password"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  {errors.password && (
                    <FormErrorMessage message={"required field"} />
                  )}
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
                    {...register("confirm_password", {
                      required: true,
                      validate: (val) => {
                        if (watch("password") !== val) {
                          return "Your passwords do not match";
                        }
                      },
                    })}
                    type="password"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  {errors.confirm_password && (
                    <FormErrorMessage
                      message={
                        errors.confirm_password.message || "required field"
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Index;
