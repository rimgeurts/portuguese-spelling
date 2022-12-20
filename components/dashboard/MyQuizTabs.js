import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MyQuizTabs({ children }) {
  const router = useRouter();
  const pathname = router.pathname;

  const [tabs, setTabs] = useState([
    {
      name: "My Quizzes",
      href: "/classroom/quizzes",
    },
    {
      name: "My Students",
      href: "/classroom/students",
    },
  ]);

  useEffect(() => {
    const updatedTabs = tabs.map((tab) => {
      return { ...tab, selected: tab.href === pathname };
    });

    setTabs(updatedTabs);
  }, [pathname]);

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          defaultValue={tabs?.find((tab) => tab.selected)?.name}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            {tabs.map((tab) => (
              <Link href={tab.href} key={tab.name}>
                <a
                  className={classNames(
                    tab.selected
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                    "w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm"
                  )}
                  aria-current={tab.selected ? "page" : undefined}
                >
                  {tab.name}
                </a>
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className={"h-[54vh] pt-4"}>{children}</div>
    </div>
  );
}
