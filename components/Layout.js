import React, { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import feather from "../public/feather-blue.svg";
import { CreateQuizButton } from "./designer/CreateQuizButton";
import Image from "next/image";
import {signOut, useSession} from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  {
    name: "Sign out",
    href: "#",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout({ children }) {
  const { data: session, status } = useSession();

  const [navigation, setNavigation] = useState([
    // { name: "Quiz", href: "/quiz", current: true },
    {
      name: "My Quizzes",
      href: "/quizlist",
      current: false,
    }, // {
    //   name: "Progress",
    //   href: "/dictionary",
    //   current: false,
    // },
  ]);

  const onSignOut = () => {
    if (session) {
      signOut({
        callbackUrl: `${window.location.origin}`
      })
    }
    return;
  };

  const onClickNavigation = (selectedNavIndex) => {
    const newNavigation = [...navigation];
    newNavigation.map((nav, navIndex) => {
      if (selectedNavIndex === navIndex) {
        nav.current = true;
      }
      if (selectedNavIndex !== navIndex) {
        nav.current = false;
      }
    });
    setNavigation((prevState) => (prevState = newNavigation));
  };

  return (
    <>
      <div className="relative  select-none min-h-full ">
        <Disclosure as="nav" className="relative border-gray-200 ">
          {({ open }) => (
            <>
              <div
                id={"quiz-viewer-header"}
                className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
              >
                <div className="flex h-16 justify-between">
                  <div className="flex">
                    <div className="flex flex-shrink-0 items-center">
                      <div className={`block h-3 w-auto lg:hidden`}>
                        <Image
                          className=""
                          width={40}
                          height={40}
                          src={feather}
                          alt=""
                        />
                      </div>
                      <div className={"hidden h-10 w-auto lg:block"}>
                        <Image src={feather} width={40} height={40} alt="" />
                      </div>
                    </div>
                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                      {navigation.map((item, navIndex) => {
                        return (
                          <Link href={item.href} key={item.name}>
                            <a
                              onClick={() => onClickNavigation(navIndex)}
                              className={classNames(
                                item.current
                                  ? "border-blue-500 text-gray-900"
                                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                "inline-flex items-center px-1 pt-1 border-b-2 text-lg font-medium cursor-pointer"
                              )}
                              aria-current={item.current ? "page" : undefined}
                            >
                              {item.name}
                            </a>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:items-center">
                    <CreateQuizButton />

                    <button
                      type="button"
                      className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="hover:bg-white flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 lg:rounded-md lg:p-2 lg:hover:bg-gray-50">
                          {session && (
                            <div className={'flex items-center'} >
                              <img
                                className="h-8 w-8 rounded-full"
                                src={session?.user?.image}
                                alt=""
                              />
                              <span className="ml-3 hidden text-sm font-medium text-gray-500 hover:text-gray-800 lg:block">
                                <span className="sr-only">
                                  Open user menu for{" "}
                                </span>
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
                                <span className="ml-3 hidden text-sm font-medium text-gray-500 hover:text-gray-800 lg:block">
                                  Login
                                </span>
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
                  <div className="-mr-2 flex items-center sm:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </Disclosure>

        <main className={"relative h-full"}>
          <div className="mx-auto max-w-4xl h-full mb-12 h-full ">
            {/* Replace with your content */}
            <div className="h-full">
              <div className="w-full h-full rounded-lg backdrop-blur-xl bg-gray-50/90  shadow-2xl border-2 border-gray-300 sm:mt-10  border-gray-200  ">
                {children}
              </div>
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  );
}
