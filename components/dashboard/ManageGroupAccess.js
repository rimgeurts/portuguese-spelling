import { EnvelopeIcon } from "@heroicons/react/24/solid";
import React from "react";

const people = [
  {
    name: "Calvin Hawkins",
    email: "calvin.hawkins@example.com",
    image:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Kristen Ramos",
    email: "kristen.ramos@example.com",
    image:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Ted Fox",
    email: "ted.fox@example.com",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Rim Geurts",
    email: "rim.fox@example.com",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Siobhan Geurts",
    email: "siobhan.fox@example.com",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

export default function ManageGroupAccess() {
  return (
    <>
      <div className="mt-8">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Invite group members
        </label>

        <div className="relative mt-1 rounded-lg shadow-sm">
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
              className="py-3 block w-full rounded-lg border-gray-300 pl-9 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
      </div>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700 mt-8 mb-2"
      >
        Current members
      </label>
      <ul
        role="list"
        className="divide-y divide-gray-200 h-[200px] overflow-y-scroll"
      >
        {people.map((person) => (
          <li key={person.email} className="flex py-4">
            <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{person.name}</p>
              <p className="text-sm text-gray-500">{person.email}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
