import { type NextPage } from "next";
import { Layout } from "~/layout";
import Image from "next/image";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { LoadingDiv } from "~/components/loading";

const User: NextPage = () => {
  const router = useRouter();
  const { data: userData, isLoading: userLoading } = api.user.getById.useQuery(
    router.query.slug as string
  );

  if (!userData && !userLoading) return <div>404</div>;

  return (
    <Layout>
      <div className="flex w-full flex-col px-52 pt-6">
        <div className="flex flex-row">
          <div className="relative flex h-36 w-44 flex-col items-center">
            {userLoading ? (
              <LoadingDiv size={30} />
            ) : (
              <>
                <Image
                  src={userData?.imageUrl ?? ""}
                  className="h-20 w-20 rounded-full mb-4"
                  alt={`${userData?.id}'s profile picture`}
                  width={56}
                  height={56}
                />
                <span className="text-white font-medium text-lg">{`${userData?.id}`}</span>
              </>
            )}
          </div>
          <div>
            <span className="text-xl font-semibold text-white">
              Repositories
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default User;
