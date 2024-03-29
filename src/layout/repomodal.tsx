import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";

export default function RepoModal(props: { repoName: string }) {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
              ${open ? "" : "text-opacity-90"}
              group inline-flex items-center rounded-md hover:bg-slate-800/75 px-3 py-2 text-base font-normal text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-opacity-75`}
          >
            <span>{props.repoName}</span>
            <ChevronDownIcon
              className={`${open ? "" : "text-opacity-70"}
                ml-2 h-5 w-5 text-slate-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
              aria-hidden="true"
            />
          </Popover.Button>
          <Popover.Overlay className="fixed inset-0 z-10 bg-gray-900 bg-opacity-40 backdrop-blur backdrop-filter" />
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-0 top-auto z-10 mt-3 w-[350px] ">
              <div className="relative flex flex-col overflow-hidden rounded-lg bg-slate-800 p-4 shadow-lg ring-1 ring-black ring-opacity-5 ">
                <p className="pb-2 text-sm font-medium text-slate-400">
                  Search Repos
                </p>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
