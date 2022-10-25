import {Fragment} from "react";
import {Disclosure, Menu, Transition} from "@headlessui/react";
import {Bars3Icon, BellIcon, XMarkIcon} from "@heroicons/react/24/outline";
import SpellingTest from "./SpellingTest";

const user = {
    name: "Tom Cook",
    email: "tom@example.com",
    imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
    {name: "Spelling Test", href: "#", current: true},
    {name: "Manage Dictionary", href: "#", current: false},
];
const userNavigation = [
    {name: "Your Profile", href: "#"},
    {name: "Settings", href: "#"},
    {name: "Sign out", href: "#"},
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Layout({children}) {
    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-gray-800">
                    {({open}) => (
                        <>
                            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                                <div className="flex items-center justify-between h-16">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <img className="w-8 h-8"
                                                 src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                                 alt="Your Company"/>
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="flex items-baseline ml-10 space-x-4">
                                                {navigation.map((item) => (
                                                    <a
                                                        key={item.name}
                                                        href={item.href}
                                                        className={classNames(
                                                            item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                            "px-3 py-2 rounded-md text-sm font-medium"
                                                        )}
                                                        aria-current={item.current ? "page" : undefined}
                                                    >
                                                        {item.name}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="flex items-center ml-4 md:ml-6">
                                            <button
                                                type="button"
                                                className="p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                            >
                                                <span className="sr-only">View notifications</span>
                                                <BellIcon className="w-6 h-6" aria-hidden="true"/>
                                            </button>

                                            {/* Profile dropdown */}
                                            <Menu as="div" className="relative ml-3">
                                                <div>
                                                    <Menu.Button
                                                        className="flex items-center max-w-xs text-sm text-white bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                        <span className="sr-only">Open user menu</span>
                                                        <img className="w-8 h-8 rounded-full" src={user.imageUrl}
                                                             alt=""/>
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items
                                                        className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        {userNavigation.map((item) => (
                                                            <Menu.Item key={item.name}>
                                                                {({active}) => (
                                                                    <a href={item.href}
                                                                       className={classNames(active ? "bg-gray-100" : "", "block px-4 py-2 text-sm text-gray-700")}>
                                                                        {item.name}
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                        ))}
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>
                                    <div className="flex -mr-2 md:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button
                                            className="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-800 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="sr-only">Open main menu</span>
                                            {open ? <XMarkIcon className="block w-6 h-6" aria-hidden="true"/> :
                                                <Bars3Icon className="block w-6 h-6" aria-hidden="true"/>}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </Disclosure>

                <header className="bg-white shadow-sm">
                    <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <h1 className="text-lg font-semibold leading-6 text-gray-900">Spelling Test</h1>
                    </div>
                </header>
                <main>
                    <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8 min-h-[1200px] ">
                        {/* Replace with your content */}
                        <div className="h-full px-4 py-4 sm:px-0 ">
                            <div className="w-full p-4  rounded-lg bg-gray-50 shadow-lg">
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
