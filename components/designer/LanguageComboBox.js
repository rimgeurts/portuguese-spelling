import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useUpdateQuizMutation } from "../../redux/apis/strapi";
import { FormErrorMessage } from "../ui/FormErrorMessage";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function LanguageComboBox({
  label,
  data,
  isError,
  selectedLanguage,
  selectedQuizId,
}) {
  const {
    register,
    setValue,
    control,
    getValues,
    handleSubmit,
    watch,
    resetField,
    setFocus,
    formState: { dirtyFields, errors },
  } = useFormContext();
  const [query, setQuery] = useState("");
  const [updateQuiz, updateQuizResults] = useUpdateQuizMutation();
  const onChange = (data) => {
    setValue("translateToLanguage", data);
    const payload = {
      id: selectedQuizId,
      data: {
        translate_to: { id: data.id },
      },
    };
    updateQuiz(payload);
  };
  console.log({ errors });
  useEffect(() => {
    if (!selectedLanguage) {
      return;
    }
    setValue("translateToLanguage", {
      id: selectedLanguage.id,
      name: selectedLanguage.attributes.title,
    });
  }, [selectedLanguage]);

  const filteredData =
    query === ""
      ? data
      : data.filter((data) => {
          return data.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className={"flex flex-col justify-center items-start"}>
      {errors?.translateToLanguage ? (
        <div className={"ml-1"}>
          <FormErrorMessage message={"Please select a language first"} />
        </div>
      ) : (
        <div className={"block text-sm font-medium text-gray-700"}>
          Translation Language
        </div>
      )}
      <Controller
        name="translateToLanguage"
        control={control}
        rules={{
          validate: () => {
            const value = getValues("translateToLanguage");
            if (value.id === "xxxx") {
              return false;
            }
            return true;
          },
        }}
        render={({ field, fieldState, formState }) => {
          return (
            <div className={"flex items-center"}>
              <Combobox value={field.value} onChange={onChange}>
                <Combobox.Label className="block text-sm text-gray-700">
                  {label}
                </Combobox.Label>
                <div className="relative mt-1">
                  <Combobox.Input
                    ref={field.ref}
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
                              active
                                ? "bg-indigo-600 text-white"
                                : "text-gray-900"
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
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
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
            </div>
          );
        }}
      />
    </div>
  );
}
