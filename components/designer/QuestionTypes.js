import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import {CheckCircleIcon} from "@heroicons/react/24/outline";

const plans = [
  { name: "Open Answer", ram: "" },
  { name: "Multiple Choice", ram: "" },
  { name: "Single Choice", ram: "" },
  { name: "True / False", ram: "" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function QuestionTypes() {
  const [selected, setSelected] = useState(plans[0]);

  return (
    <RadioGroup value={selected} onChange={setSelected}>
      <div className="grid grid-cols-4 gap-4 my-1 select-none">
        {plans.map((plan) => (
          <RadioGroup.Option
            key={plan.name}
            value={plan}
            className={({ checked, active }) =>
              classNames(
                checked ? "border-transparent" : "border-gray-300",
                active ? "bg-blue-50 border-blue-500 ring-1 ring-blue-500" : "",
                "relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between"
              )
            }
          >
            {({ active, checked }) => (
              <>
                <span className="flex items-center">
                  <span className="flex flex-col text-sm">
                    <RadioGroup.Label
                      as="span"
                      className="font-medium text-gray-900"
                    >
                      <div className={"flex items-center justify-start"}>
                      {checked && (<CheckCircleIcon
                          className={classNames(
                              !checked ? "invisible" : "",
                              "h-5 w-5 text-white bg-blue-500 rounded-full"
                          )}
                          aria-hidden="true"
                      />)}
                        { !checked && (<div className={'h-5 w-5  border border-gray-300  rounded-full'}></div>)}
                        <label className="ml-3 block text-sm font-medium text-gray-700">
                          {plan.name}
                        </label>
                      </div>
                    </RadioGroup.Label>
                    <RadioGroup.Description as="span" className="text-gray-500">
                      <span className="block sm:inline">{plan.ram}</span>
                    </RadioGroup.Description>
                  </span>
                </span>

                <span
                  className={classNames(
                    active ? "border" : "border-2",
                    checked ? "border-blue-500" : "border-transparent",
                    "pointer-events-none absolute -inset-px rounded-lg"
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
