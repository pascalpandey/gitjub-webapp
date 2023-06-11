import { type NextPage } from "next";
import { Layout } from "../../layout";
import Image from "next/image";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { LoadingDiv } from "../../components/loading";
import Link from "next/link";

const User: NextPage = () => {
  const router = useRouter();
  const userId = router.query.userId as string
  const { data: userData, isLoading: userLoading } = api.user.getById.useQuery(
    userId
  );
  const { data: reposData, isLoading: reposLoading } =
    api.repo.getByUser.useQuery(userId);

  if (!userData && !userLoading) return <div>404</div>;

  return (
    <Layout>
      <div className="flex w-full flex-col px-52">
        <div className="flex flex-row">
          <div className="relative flex h-36 w-44 flex-col items-center pr-7">
            {userLoading ? (
              <LoadingDiv size={30} />
            ) : (
              <>
                <Image
                  src={userData?.imageUrl ?? ""}
                  className="mb-4 h-20 w-20 rounded-full"
                  alt={`${userData?.id ?? ""}'s profile picture`}
                  width={56}
                  height={56}
                />
                <span className="text-lg font-medium text-white">{`${
                  userData?.id ?? ""
                }`}</span>
              </>
            )}
          </div>
          <div className="flex w-full flex-col flex-wrap gap-4">
            <span className="text-xl font-semibold text-white">
              Repositories
            </span>
            {reposLoading ? (
              <LoadingDiv size={30} />
            ) : (
              reposData?.map((repo, i) => (
                <div
                  key={i}
                  className="flex w-72 items-center gap-3 rounded-md bg-slate-800 p-5"
                >
                  <Link href={`/${userId}/${repo.name}/overview`}>
                    <span className="text-white hover:text-blue-400">{`${
                      repo.name
                    }`}</span>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default User;
