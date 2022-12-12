import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, UsersIcon } from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const everyoneGroup = {
  id: "xxx",
  groupName: "Everyone",
};

export default function GroupList({ groups }) {
  const [selectedGroupId, setSelectedGroupId] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState(
    groups?.data[selectedGroupId]
  );

  useEffect(() => {
    if (!groups?.data) {
      return;
    }
    setSelectedGroup(groups?.data[selectedGroupId]);
  }, [groups]);

  const onSelectedGroup = (value) => {
    if (!value) {
      return;
    }
    const index = groups.data.findIndex((group) => group.id === value.id);
    setSelectedGroupId(index);
    setSelectedGroup(value);
  };

  console.log({ groups });
  return (
    <div className={"select-none"}>
      <Listbox
        value={selectedGroup}
        onChange={(value) => onSelectedGroup(value)}
      >
        {({ open }) => (
          <div className={"flex items-center mt-3 cursor-pointer"}>
            <div
              className={
                "mr-4 bg-gray-50 h-[50px] w-[50px] rounded-full flex items-center justify-center"
              }
            >
              <UsersIcon
                className={"w-[30px] h-[30px] text-gray-300"}
              ></UsersIcon>
            </div>

            <div className="relative ">
              <Listbox.Button className="relative rounded-md  bg-white  pr-10 text-left focus:outline-none sm:text-sm  ">
                <span className="block truncate text-xs font-normal   text-gray-500 ">
                  <div className={"flex items-center "}>
                    {selectedGroup?.groupName}
                    <div className="flex items-center">
                      <ChevronDownIcon
                        className="h-4 w-4 text-gray-700 stroke-[2px] ml-2"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="shadow-lg absolute z-10 mt-2 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  <Listbox.Option
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-blue-600" : "text-gray-900",
                        "relative  select-none py-2 pl-8 pr-4"
                      )
                    }
                    value={everyoneGroup}
                  >
                    {({ selectedGroup, active }) => (
                      <>
                        <span
                          className={classNames(
                            selectedGroup ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {"Everyone"}
                        </span>

                        {selectedGroup ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-blue-600",
                              "absolute inset-y-0 left-0 flex items-center pl-1.5"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                  {groups?.data.map((group) => (
                    <Listbox.Option
                      key={group.id}
                      className={({ active }) =>
                        classNames(
                          active ? "text-white bg-blue-600" : "text-gray-900",
                          "relative  select-none py-2 pl-8 pr-4"
                        )
                      }
                      value={group}
                    >
                      {({ selectedGroup, active }) => (
                        <>
                          <span
                            className={classNames(
                              selectedGroup ? "font-semibold" : "font-normal",
                              "block truncate"
                            )}
                          >
                            {group.groupName}
                          </span>

                          {selectedGroup ? (
                            <span
                              className={classNames(
                                active ? "text-white" : "text-blue-600",
                                "absolute inset-y-0 left-0 flex items-center pl-1.5"
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </div>
        )}
      </Listbox>
    </div>
  );
}
