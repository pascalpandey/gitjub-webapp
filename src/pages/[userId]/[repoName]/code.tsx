import { Layout } from "~/layout";
import { NextPage } from "next";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useState } from "react";
import { LoadingDiv } from "~/components/loading";
import { FolderIcon } from "@heroicons/react/20/solid";
import { DocumentIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const RepoCode: NextPage = () => {
  const router = useRouter();
  const userId = router.query.userId as string;
  const repoName = router.query.repoName as string;
  const branchParam = router.query.branch as string | undefined;
  const path = router.query.path as string | undefined;
  const [branch, setBranch] = useState(branchParam ?? "main");

  const { data, isLoading } = path
    ? api.repo.getBranchEntry.useQuery({
        userId: userId,
        repoName: repoName,
        branch: branch,
        path: path as string,
      })
    : api.repo.getBranchOverview.useQuery({
        userId: userId,
        repoName: repoName,
        branch: branch,
      });

  return (
    <Layout>
      <div className="flex w-full flex-col px-52 pt-6">
        {isLoading && <LoadingDiv size={30} />}
        {Array.isArray(data) ? (
          <div className="rounded-md bg-slate-800">
            {data?.map((entry, i) => (
              <Link href={`/${userId}/${repoName}/code?branch=${branch}`}>
                <div
                  key={i}
                  className={`flex flex-row items-center gap-4 p-4 ${
                    i === 0 ? "rounded-t-md" : "border-t-[1px]"
                  } ${
                    i === data.length - 1 ? "rounded-b-md" : ""
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
          <div className="rounded-md bg-slate-800 p-4">{data?.toString()}</div>
        )}
      </div>
    </Layout>
  );
};

export default RepoCode;
