import React, { Fragment, useEffect } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { setCredentials } from "../redux/slices/uiSlice";
import { useDispatch } from "react-redux";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function LayoutAuthentication(props) {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }
    dispatch(setCredentials({ user: session.user.email, token: session.jwt }));
  });

  const onSignOut = async () => {
    if (session) {
      await signOut({
        callbackUrl: `${window.location.origin}`,
      });
    }
    return;
  };

  return (
    <div>
      {/* Profile dropdown */}
      <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button className="hover:bg-white flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 lg:rounded-md lg:p-2 lg:hover:bg-gray-50">
            {session && (
              <div className={"flex items-center"}>
                <img
                  className="h-8 w-8 rounded-full"
                  src={session?.user?.image}
                  alt=""
                />
                <span className="ml-3 text-sm font-medium text-gray-400 hover:text-gray-800 lg:block">
                  <span className="sr-only">Open user menu for </span>
                  {session?.user?.name}
                </span>
                <ChevronDownIcon
                  className="ml-1 hidden h-5 w-5 flex-shrink-0 text-gray-400 lg:block"
                  aria-hidden="true"
                />
              </div>
            )}
            {!session && (
              <Link href={"/login"}>
                <div className={"flex items-center"}>
                  <span className="inline-block w-12 h-12 overflow-hidden bg-gray-100 rounded-full">
                    <svg
                      className="w-full h-full text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                  <div className="ml-3 text-sm font-medium text-gray-400 hover:text-gray-800 lg:block">
                    Sign in
                  </div>
                </div>
              </Link>
            )}
          </Menu.Button>
        </div>
        {session && (
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    Your Profile
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    Settings
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    onClick={() => onSignOut()}
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    Logout
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        )}
      </Menu>
    </div>
  );
}

export default LayoutAuthentication;
