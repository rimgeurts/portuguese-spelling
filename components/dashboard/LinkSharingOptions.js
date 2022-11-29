import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { LinkIcon } from "@heroicons/react/24/solid";
import { Fragment, useState } from "react";

const people = [
  {
    id: 1,
    name: "Everyone",
    description:
      "The quiz can be taken by everyone that has access to this link",
  },
  {
    id: 2,
    name: "Only group members",
    description: "Only members of this group are able to take the quiz",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function LinkSharingOptions() {
  const [selected, setSelected] = useState(people[1]);

  return (
    <div>
      <Listbox value={selected} onChange={setSelected}>
        {({ open }) => (
          <div className={"flex items-center mt-2"}>
            <div
              className={
                "mr-4 bg-blue-100 h-[50px] w-[50px] rounded-full flex items-center justify-center"
              }
            >
              <LinkIcon
                className={"w-[30px] h-[30px] text-blue-500"}
              ></LinkIcon>
            </div>
            <div className="relative ">
              <Listbox.Button className="relative cursor-default rounded-md  bg-white  pr-10 text-left focus:outline-none sm:text-sm ">
                <span className="block truncate font-semibold text-gray-700">
                  {selected.name}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-3  flex items-center pr-2">
                  <ChevronDownIcon
                    className="h-4 w-4 text-gray-700 stroke-2"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <div className={"text-sm text-gray-500 max-w-xs"}>
                {selected.description}
              </div>
              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 -mt-9 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {people.map((person) => (
                    <Listbox.Option
                      key={person.id}
                      className={({ active }) =>
                        classNames(
                          active ? "text-white bg-blue-600" : "text-gray-900",
                          "relative cursor-default select-none py-2 pl-8 pr-4"
                        )
                      }
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "block truncate"
                            )}
                          >
                            {person.name}
                          </span>

                          {selected ? (
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
