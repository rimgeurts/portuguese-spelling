import { PencilIcon, UsersIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {useDispatch, useSelector} from 'react-redux';
import { useUpdateUserGroupByIdMutation } from "../../../redux/apis/strapi";
import {selectUI} from '../../../redux/slices/uiSlice';
import { FormErrorMessage } from "../../ui/FormErrorMessage";

export default function GroupAccordionTitle({ group }) {

  // Declare a state variable to store the group name
  const [groupName, setGroupName] = useState(group.groupName);
  // Declare a state variable to determine whether the input field should be displayed or not
  const [showInputField, setShowInputField] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setFocus,
    watch,
    setValue,
  } = useForm();

  // watch the input field for changes
  const watchInputField = watch("inputValue");

  const [updateUserGroup, updateUserGroupStatus] =
    useUpdateUserGroupByIdMutation();

  // Use the useEffect hook to reset the value of showInputField after the form is submitted
  useEffect(() => {
    if (errors && Object.keys(errors).length === 0) {
      setShowInputField(false);
    }
  }, [errors]);


  const handleClick = () => {
    // Set the value of showInputField to true when the pencil icon is clicked
    setShowInputField(true);
  };

  useEffect(() => {
    if (showInputField) {
      setValue("inputValue", groupName);
      setFocus("inputValue");
    }
  }, [showInputField]);

  const onSubmit = async () => {
    setGroupName(watchInputField);
    setShowInputField(false);
    await updateUserGroup({
      id: group.id,
      data: {
        groupName: watchInputField,
      },
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSubmit();
    }
  };


  return (
    <div
      onClick={handleClick}
      className={"relative flex items-center gap-2 cursor-pointer"}
    >
      <UsersIcon className={" h-8 w-8 text-gray-300"} />
      {!showInputField ? (
        <div
          className={
            "group relative flex items-center gap-2 hover:font-semibold"
          }
        >
          {groupName}
          <PencilIcon
            className={
              "h-4 w-4 text-gray-300 absolute -top-1 -right-6 group-hover:text-gray-400"
            }
          />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={"flex items-center gap-2"}
        >
          <input
            autoComplete={"off"}
            type={"text"}
            onKeyDown={handleKeyDown}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            {...register("inputValue", { required: true })}
          />
          <button
            type="submit"
            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save
          </button>
          {errors?.inputValue && (
            <div className={"whitespace-nowrap"}>
              <FormErrorMessage message={"you need to enter a group title"} />
            </div>
          )}
        </form>
      )}
    </div>
  );
}
