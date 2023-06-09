import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon, HomeIcon, CodeBracketIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function RepoDirModal(props: { repoDir: string }) {
  const router = useRouter();
  const userId = router.query.userId as string
  const repoName = router.query.repoName as string
  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button
            className={`
              ${open ? "" : "text-opacity-90"}
              group inline-flex items-center rounded-md hover:bg-slate-800/75 px-3 py-2 text-base font-normal text-white hover:text-opacity-100  focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-opacity-75`}
          >
            <span>
              {props.repoDir.charAt(0).toUpperCase() + props.repoDir.slice(1)}
            </span>
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
            <Popover.Panel className="absolute left-0 top-auto z-10 mt-3 w-44 ">
              <div className="relative flex flex-col overflow-hidden rounded-lg bg-slate-800 p-2 shadow-lg ring-1 ring-black ring-opacity-5 ">
                <Link href={`/${userId}/${repoName}/overview`} onClick={() => close()}>
                  <div className="flex flex-row items-center gap-3 rounded-md p-3 hover:bg-slate-700/50">
                    <HomeIcon className="h-6 w-6 text-slate-500" />
                    <span className="text-white">Overview</span>
                  </div>
                </Link>
                <Link href={`/${userId}/${repoName}/code`} onClick={() => close()}>
                  <div className="flex flex-row items-center gap-3 rounded-md p-3 hover:bg-slate-700/50">
                    <CodeBracketIcon className="h-6 w-6 text-slate-500" />
                    <span className="text-white">Code</span>
                  </div>
                </Link>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
