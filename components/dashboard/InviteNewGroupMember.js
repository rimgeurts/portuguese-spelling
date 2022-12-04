import { EnvelopeIcon } from "@heroicons/react/24/solid";
import React from "react";

export default function InviteNewGroupMember() {
  return (
    <>
      <label
        htmlFor="email"
        className="block text-sm font-semibold text-gray-700"
      >
        Invite group members
      </label>

      <div className="relative mt-1 rounded-lg  w-full ">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
          aria-hidden="true"
        >
          <EnvelopeIcon
            className="mr-3 h-4 w-4 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <div className={"flex gap-2"}>
          <input
            type="text"
            name="search"
            id="search"
            className="py-3 block w-full rounded-lg border-gray-300 pl-9 focus:border-blue-500 focus:ring-blue-500 sm:text-sm max-w-lg"
            placeholder="info@example.com"
          />
          <button
            type="button"
            className="whitespace-nowrap inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Send Invite
          </button>
        </div>
      </div>
    </>
  );
}
