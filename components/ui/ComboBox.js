import { useEffect, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";

// const people = [
//   { id: 1, name: "Portuguese" },
//   { id: 2, name: "French" },
//   { id: 3, name: "Italian" },
//   { id: 4, name: "Spanish" },
//   { id: 5, name: "German" },
//   { id: 6, name: "English" },
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ComboBox({
  label,
  defaultValue,
  data,
  onChangeAction,
  isError,
  setIsError,
}) {
  const [initialRender, setInitalRender] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedAttribute, setSelectedAttribute] = useState({
    id: "xxxxx",
    name: defaultValue,
  });

  useEffect(() => {
    if(initialRender) {
      setInitalRender(false);
      return;
    }
    if(selectedAttribute.id === 'xxxxx') {
      return;
    }
    onChangeAction(selectedAttribute);
  }, [selectedAttribute]);

  const filteredData =
    query === ""
      ? data
      : data.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox
      as="div"
      value={selectedAttribute}
      onChange={setSelectedAttribute}
    >
      <Combobox.Label className="block text-sm text-gray-700">
        {label}
      </Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          className={`${
            !isError
              ? "border border-gray-300"
              : "border-2 border-pink-600 "
          } w-full rounded-md bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm`}
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(person) => person?.name}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {filteredData?.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredData.map((person) => (
              <Combobox.Option
                key={person.id}
                value={person}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-8 pr-4",
                    active ? "bg-indigo-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        "block truncate",
                        selected && "font-semibold"
                      )}
                    >
                      {person.name}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 left-0 flex items-center pl-1.5",
                          active ? "text-white" : "text-indigo-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
