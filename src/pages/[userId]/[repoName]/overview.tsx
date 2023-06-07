import { Layout } from "~/layout";
import { NextPage } from "next";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useState } from "react";
import { LoadingDiv } from "~/components/loading";

const RepoOverview: NextPage = () => {
  const router = useRouter();
  const [branch, setBranch] = useState("main");
  const { data, isLoading } = api.repo.getBranchPath.useQuery({
    userId: router.query.userId as string,
    repoName: router.query.repoName as string,
    branch: branch,
  });

  return (
    <Layout>
      <div className="flex w-full flex-col px-52 pt-6">
        {isLoading && <LoadingDiv size={30}/>}
        {data?.map((entry, i) => (
          <div key={i}>
            <span className="text-white">{entry.path}</span>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default RepoOverview;
