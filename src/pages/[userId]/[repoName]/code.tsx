import { Layout } from "~/layout";
import { NextPage } from "next";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useState } from "react";
import { LoadingDiv } from "~/components/loading";
import { FolderIcon } from "@heroicons/react/20/solid";
import { DocumentIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { Menu } from "@headlessui/react";

const DirDropdown = () => {
  return (
    <Menu>
      <Menu.Button>More</Menu.Button>
      <Menu.Items>
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${active && "bg-blue-500"}`}
              href="/account-settings"
            >
              Account settings
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${active && "bg-blue-500"}`}
              href="/account-settings"
            >
              Documentation
            </a>
          )}
        </Menu.Item>
        <Menu.Item disabled>
          <span className="opacity-75">Invite a friend (coming soon!)</span>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

const RepoCode: NextPage = () => {
  const router = useRouter();
  const userId = router.query.userId as string;
  const repoName = router.query.repoName as string;
  const branchParam = router.query.branch as string | undefined;
  const path = router.query.path as string | undefined;
  const [branch, setBranch] = useState(branchParam ?? "main");

  const { data: fileData, isLoading } = api.repo.getBranchOverview.useQuery({
    userId: userId,
    repoName: repoName,
    branch: branch,
  });

  const codeData = path
    ? api.repo.getBranchEntry.useQuery({
        userId: userId,
        repoName: repoName,
        branch: branch,
        path: path,
      }).data
    : fileData;

  return (
    <Layout>
      <div className="flex h-full flex-row gap-4 px-20">
        <div className="min-w-60 flex w-60 flex-shrink-0 bg-slate-800">
          <div className="flex flex-col w-full">
          {isLoading && <LoadingDiv size={30} />}
          {!isLoading &&
            fileData?.map((entry, i) => (
              <Link
                href={`/${userId}/${repoName}/code?branch=${branch}`}
                key={i}
              >
                <div
                  className={`flex flex-row items-center gap-4 border-slate-700 p-2 hover:bg-slate-700/50 w-full`}
                >
                  <DocumentIcon className="h-6 w-6 text-slate-500" />
                  <span className="text-white hover:text-blue-400">
                    {entry.path}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex w-full flex-col">
          {isLoading && <LoadingDiv size={30} />}
          {!isLoading &&
            (Array.isArray(codeData) ? (
              <div className="rounded-md bg-slate-800">
                {codeData?.map((entry, i) => (
                  <Link
                    href={`/${userId}/${repoName}/code?branch=${branch}`}
                    key={i}
                  >
                    <div
                      className={`flex flex-row items-center gap-4 p-4 ${
                        i === 0 ? "rounded-t-md" : "border-t-[1px]"
                      } ${
                        i === codeData.length - 1 ? "rounded-b-md" : ""
                      } border-slate-700 hover:bg-slate-700/50`}
                    >
                      {entry.isDirectory ? (
                        <FolderIcon className="h-6 w-6 text-slate-500" />
                      ) : (
                        <DocumentIcon className="h-6 w-6 text-slate-500" />
                      )}
                      <span className="text-white hover:text-blue-400">
                        {entry.path}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <pre className="flex-1 overflow-auto rounded-md bg-slate-800 p-4">
                {typeof codeData === "object"
                  ? JSON.stringify(codeData, null, 2)
                  : codeData}
              </pre>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default RepoCode;
