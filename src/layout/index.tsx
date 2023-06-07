import { SignOutButton } from "@clerk/nextjs";
import type { PropsWithChildren } from "react";
import KeyModal from "./keymodal";
import Link from "next/link";
import { useRouter } from "next/router";
import UserModal from "./usermodal";
import RepoModal from "./repomodal";
import RepoDirModal from "./repodirmodal";

export const Layout = (props: PropsWithChildren) => {
  const router = useRouter();
  const urlArr = router.pathname.split("/")
  const repoDir = urlArr[3] ?? ""

  return (
    <div className="flex h-screen flex-col">
      <div className="flex h-28 flex-row items-center bg-[#161b22] px-20 gap-8">
        <Link href={"/"}>
          <span className="text-lg font-semibold text-white">GITJUB</span>
        </Link>
        {router.query?.userId && (
          <div className="flex flex-row items-center gap-8">
            <span className="text-gray-500 font-semibold text-xl">{'/'}</span>
            <UserModal userId={router.query.userId as string} />
          </div>
        )}
        {router.query?.repoId && (
          <div className="flex flex-row items-center gap-8">
            <span className="text-gray-500 font-semibold text-xl">{'/'}</span>
            <RepoModal repoId={router.query.repoId as string} />
            <span className="text-gray-500 font-semibold text-xl">{'/'}</span>
            <RepoDirModal repoDir={repoDir}/>
          </div>
        )}
        <div className="ml-auto flex gap-8 font-medium text-white">
          <KeyModal />
          <SignOutButton />
        </div>
      </div>
      <main className="flex flex-1 bg-[#0d1116] px-20 pt-4">
        {props.children}
      </main>
    </div>
  );
};
