import React, { useState } from "react";
import MyQuizzes from "./MyQuizzes";
import MyStudents from "./myStudents/MyStudents";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MyQuizTabs() {
  const [tabs, setTabs] = useState([
    { name: "My Quizzes", href: "#", current: true, component: <MyQuizzes /> },
    {
      name: "My Students",
      href: "#",
      current: false,
      component: <MyStudents />,
    },
  ]);

  const onSelectTab = (selectedTab) => {
    const newTabs = [...tabs];
    newTabs.map((tab) => {
      if (tab.name === selectedTab.name) {
        return (tab.current = true);
      }
      return (tab.current = false);
    });
    setTabs(newTabs);
  };

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
          defaultValue={tabs.find((tab) => tab.current).name}
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
              <a
                onClick={() => onSelectTab(tab)}
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.current
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
      <div className={"h-[54vh] pt-4"}>
        {tabs.find((tab) => tab.current).component}
      </div>
    </div>
  );
}
