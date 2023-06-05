import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { LoadingSpinner } from "~/components/loading";
import { api } from "~/utils/api";

export const KeyModal = () => {
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState("");
  const user = useUser();

  const { mutate } = api.key.upsertKey.useMutation({
    onSuccess: () => {
      setOpen(false);
    },
  });

  const { data, isLoading } = api.key.getKey.useQuery();

  return (
    <>
      <div
        className="fixed right-0 top-0 h-full w-full"
        onClick={() => {
          setOpen(false);
        }}
      ></div>
      <div className="relative">
        <button
          onClick={() => {
            setOpen(true);
          }}
        >
          SSH Key
        </button>
        {open && (
          <div className="absolute right-0 mt-3 flex w-[500px] flex-col gap-3 rounded-md border-[1px] border-[#2f353c] bg-[#161b22] p-5 shadow-sm">
            <span className="font-semibold">Enter your SSH key</span>
            <div className="flex items-center justify-center">
              {isLoading && <LoadingSpinner size={60} />}
              <textarea
                className="w-full grow rounded-md border-[1px] border-[#2f353c] bg-[#02040a] p-3 text-sm font-normal outline-none"
                cols={40}
                rows={11}
                onChange={(e) => {
                  setKey(e.target.value);
                }}
                defaultValue={data ? data : ""}
                disabled={isLoading}
              ></textarea>
            </div>
            <button
              onClick={() => {
                if (user?.user?.username) {
                  mutate(key);
                }
              }}
              className="w-fit self-end rounded-md bg-[#238636] px-4 py-2 font-semibold"
            >
              Save SSH key
            </button>
          </div>
        )}
      </div>
    </>
  );
};
