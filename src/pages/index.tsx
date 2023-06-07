import { type NextPage } from "next";
import { useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Layout } from "~/layout";
import { api } from "~/utils/api";
import { toast } from "react-hot-toast";
import { LoadingDiv } from "~/components/loading";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [key, setKey] = useState("");
  const { data: userData } = api.user.getSelf.useQuery();
  const { data: usersData, isLoading: usersLoading } =
    api.user.getAll.useQuery();

  const { mutate } = api.user.createUser.useMutation({
    onSuccess: () => {
      toast.success("User created");
      setIsOpen(false);
    },
  });

  useEffect(() => {
    if (userData !== undefined && userData === null) {
      setIsOpen(true);
    }
  }, [userData]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setIsOpen(true);
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900 bg-opacity-40 backdrop-blur backdrop-filter" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex w-[450px] transform flex-col overflow-hidden rounded-2xl bg-slate-800 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-200"
                  >
                    This is your first sign in!
                  </Dialog.Title>
                  <p className="my-2 text-sm text-gray-300">
                    {`Please enter your machine's SSH key to proceed.`}
                  </p>
                  <textarea
                    className="w-full grow rounded-md border-[1px] border-[#2f353c] bg-[#02040a] p-3 font-mono text-sm font-normal text-white outline-none"
                    rows={11}
                    onChange={(e) => {
                      setKey(e.target.value);
                    }}
                  ></textarea>
                  <button
                    type="button"
                    className="mt-4 w-fit self-end rounded-md border border-transparent bg-slate-100 px-2 py-1 text-sm font-medium text-slate-900 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 disabled:bg-slate-100 "
                    onClick={() => {
                      mutate(key);
                    }}
                    disabled={key === ""}
                  >
                    Save Key
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Layout>
        <div className="flex w-full flex-col px-52 pt-6">
          <span className="text-xl font-semibold text-white">Users</span>
          <div className="min-h-4 flex flex-wrap gap-4 py-6">
            {usersLoading && <LoadingDiv size={30} />}
            {usersData?.map((user, i) => (
              <div
                key={i}
                className="flex w-72 items-center gap-3 rounded-md bg-slate-800 p-5"
              >
                <Image
                  src={user.imageUrl}
                  className="h-14 w-14 rounded-full"
                  alt={`${user.id}'s profile picture`}
                  width={56}
                  height={56}
                />
                <Link href={`/${user.id}`}>
                  <span className="text-white hover:text-blue-400">{`${user.id} `}</span>
                </Link>
              </div>
            ))}
          </div>
          <span className="text-xl font-semibold text-white">Repositories</span>
        </div>
      </Layout>
    </>
  );
};

export default Home;
