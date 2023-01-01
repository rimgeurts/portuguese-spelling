import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ToggleButton({ title, subTitle, action, enabled, setEnabled }) {


  return (
    <Switch.Group as="div" className="flex items-center">
      <Switch.Label as="span" className="mr-4">
        <div className="text-sm font-medium text-gray-900">{title}</div>
        <div className="text-xs text-gray-500">{subTitle}</div>
      </Switch.Label>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={classNames(
          enabled ? "bg-blue-600" : "bg-gray-200",
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          )}
        />
      </Switch>
    </Switch.Group>
  );
}
