import {Fragment} from "react";
import {Disclosure, Menu, Transition} from "@headlessui/react";
import {Bars3Icon, BellIcon, XMarkIcon} from "@heroicons/react/24/outline";
import SpellingTest from "./SpellingTest";

const user = {
    name: "Tom Cook",
    email: "tom@example.com",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [{name: "Quiz", href: "/quiz", current: true}, {
    name: "Dictionary",
    href: "/dictionary",
    current: false
},];
const userNavigation = [{name: "Your Profile", href: "#"}, {name: "Settings", href: "#"}, {
    name: "Sign out",
    href: "#"
},];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Layout({children}) {
    return (<>
        {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
        <div className="relative h-screen bg-gradient-to-r from-sky-400 to-blue-500 w-full">
            <div className={'absolute top-[60px] left-0 z-0 w-full  z-0'}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1040 320"><path fill="#f9fafb" fill-opacity="1" d="M0,160L18.5,165.3C36.9,171,74,181,111,197.3C147.7,213,185,235,222,202.7C258.5,171,295,85,332,90.7C369.2,96,406,192,443,218.7C480,245,517,203,554,160C590.8,117,628,75,665,69.3C701.5,64,738,96,775,101.3C812.3,107,849,85,886,69.3C923.1,53,960,43,997,48C1033.8,53,1071,75,1108,122.7C1144.6,171,1182,245,1218,282.7C1255.4,320,1292,320,1329,309.3C1366.2,299,1403,277,1422,266.7L1440,256L1440,0L1421.5,0C1403.1,0,1366,0,1329,0C1292.3,0,1255,0,1218,0C1181.5,0,1145,0,1108,0C1070.8,0,1034,0,997,0C960,0,923,0,886,0C849.2,0,812,0,775,0C738.5,0,702,0,665,0C627.7,0,591,0,554,0C516.9,0,480,0,443,0C406.2,0,369,0,332,0C295.4,0,258,0,222,0C184.6,0,148,0,111,0C73.8,0,37,0,18,0L0,0Z"></path></svg>
            </div>
                {/*<svg className={''} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1040 320">*/}
                {/*    <path fill="#f9fafb" fill-opacity="1"*/}
                {/*          d="M0,160L18.5,165.3C36.9,171,74,181,111,197.3C147.7,213,185,235,222,202.7C258.5,171,295,85,332,90.7C369.2,96,406,192,443,218.7C480,245,517,203,554,160C590.8,117,628,75,665,69.3C701.5,64,738,96,775,101.3C812.3,107,849,85,886,69.3C923.1,53,960,43,997,48C1033.8,53,1071,75,1108,122.7C1144.6,171,1182,245,1218,282.7C1255.4,320,1292,320,1329,309.3C1366.2,299,1403,277,1422,266.7L1440,256L1440,320L1421.5,320C1403.1,320,1366,320,1329,320C1292.3,320,1255,320,1218,320C1181.5,320,1145,320,1108,320C1070.8,320,1034,320,997,320C960,320,923,320,886,320C849.2,320,812,320,775,320C738.5,320,702,320,665,320C627.7,320,591,320,554,320C516.9,320,480,320,443,320C406.2,320,369,320,332,320C295.4,320,258,320,222,320C184.6,320,148,320,111,320C73.8,320,37,320,18,320L0,320Z"></path>*/}
                {/*</svg>*/}
                <img className={'absolute bottom-0 left-0 z-0 w-full'} src="./background.svg" alt=""/>



            <Disclosure as="nav" className="relative border-b border-gray-200 bg-white ">
                {({open}) => (
                    <>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 justify-between">
                                <div className="flex">
                                    <div className="flex flex-shrink-0 items-center">
                                        <img
                                            className="block h-8 w-auto lg:hidden"
                                            src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=600"
                                            alt="Your Company"
                                        />
                                        <img
                                            className="hidden h-8 w-auto lg:block"
                                            src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=600"
                                            alt="Your Company"
                                        />
                                    </div>
                                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? 'border-blue-500 text-gray-900'
                                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                                    'inline-flex items-center px-1 pt-1 border-b-2 text-lg font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                                <div className="hidden sm:ml-6 sm:flex sm:items-center">
                                    <button
                                        type="button"
                                        className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon className="h-6 w-6" aria-hidden="true"/>
                                    </button>

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button
                                                className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                                <span className="sr-only">Open user menu</span>
                                                <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt=""/>
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items
                                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {userNavigation.map((item) => (
                                                    <Menu.Item key={item.name}>
                                                        {({active}) => (
                                                            <a
                                                                href={item.href}
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700'
                                                                )}
                                                            >
                                                                {item.name}
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                                <div className="-mr-2 flex items-center sm:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button
                                        className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>


                    </>
                )}
            </Disclosure>


            <main className={'relative'}>
                <div className="py-6 mx-auto max-w-4xl sm:px-6 lg:px-8  ">
                    {/* Replace with your content */}
                    <div className="h-full px-4 py-4 sm:px-0 ">
                        <div className="w-full p-4  rounded-lg bg-gray-50 shadow-2xl border-4 border-gray-200">
                            {children}
                        </div>
                    </div>
                    {/* /End replace */}
                </div>
            </main>
        </div>
    </>);
}
