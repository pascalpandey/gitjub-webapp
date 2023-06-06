import { useState } from "react";
import { LoadingSpinner } from "~/components/loading";
import { api } from "~/utils/api";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { toast } from "react-hot-toast";

export default function KeyModal() {
  const [key, setKey] = useState("");
  const { data, isLoading } = api.key.getKey.useQuery();
  const { mutate } = api.key.upsertKey.useMutation({
    onSuccess: () => {
      toast.success('SSH key updated')
    }
  });

  return (
    <Popover className="relative">
      {({ open, close }) => (
        <>
          <Popover.Button
            className={`
              ${open ? "" : "text-opacity-90"}
              group inline-flex items-center rounded-md bg-slate-800 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-opacity-75`}
          >
            <span>SSH Key</span>
            <ChevronDownIcon
              className={`${open ? "" : "text-opacity-70"}
                ml-2 h-5 w-5 text-slate-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
              aria-hidden="true"
            />
          </Popover.Button>
          <Popover.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-40 backdrop-blur backdrop-filter" />
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 top-auto z-10 mt-3 w-[350px] ">
              <div className="relative flex flex-col overflow-hidden rounded-lg bg-slate-800 p-4 shadow-lg ring-1 ring-black ring-opacity-5 ">
                <p className="pb-2 text-sm font-medium text-slate-400">
                  SSH Key
                </p>
                <div className="flex items-center justify-center">
                  {isLoading && <LoadingSpinner size={60} />}
                  <textarea
                    className="w-full grow rounded-md border-[1px] border-[#2f353c] bg-[#02040a] p-3 font-mono text-sm font-normal outline-none"
                    rows={5}
                    onChange={(e) => {
                      setKey(e.target.value);
                    }}
                    defaultValue={data ?? ""}
                    disabled={isLoading}
                  ></textarea>
                </div>
                <button
                  type="button"
                  className="mt-4 w-fit self-end rounded-md border border-transparent bg-slate-100 px-2 py-1 text-sm font-medium text-slate-900 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
                  onClick={() => {
                    mutate(key);
                    close();
                  }}
                  disabled={isLoading}
                >
                  Save Key
                </button>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
