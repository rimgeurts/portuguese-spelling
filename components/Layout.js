import { Disclosure } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import feather from "../public/feather-blue.svg";
import { CreateQuizButton } from "./designer/CreateQuizButton";
import LayoutAuthentication from "./LayoutAuthentication";

// const user = {
//   name: "Tom Cook",
//   email: "tom@example.com",
//   imageUrl:
//     "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
// };
//
// const userNavigation = [
//   { name: "
//   Your Profile", href: "#" },
//   { name: "Settings", href: "#" },
//   {
//     name: "Sign out",
//     href: "#",
//   },
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout({ children }) {
  const { data: session, status } = useSession();

  const [navigation, setNavigation] = useState([
    // { name: "Quiz", href: "/quiz", current: true },
    {
      name: "My Learning",
      href: "/students",
      current: false,
    },
    {
      name: "My Classroom",
      href: "/classroom",
      current: false,
    },
  ]);

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
                    <LayoutAuthentication />
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
              <div className="w-full h-full rounded-2xl bg-white shadow-2xl  sm:mt-10 py-2  ">
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
