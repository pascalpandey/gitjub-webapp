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
  const urlArr = router.pathname.split("/");
  const repoDir = urlArr[3] ?? "";

  return (
    <div className="flex h-screen flex-col">
      <div className="flex h-28 flex-row items-center gap-6 bg-[#161b22] px-20">
        <Link href={"/"}>
          <span className="text-lg font-semibold text-white">GITJUB</span>
        </Link>
        {router.query?.userId && (
          <div className="flex flex-row items-center gap-5">
            <span className="text-xl font-semibold text-gray-500">{"/"}</span>
            <UserModal userId={router.query.userId as string} />
          </div>
        )}
        {router.query?.repoName && (
          <div className="flex flex-row items-center gap-5">
            <span className="text-xl font-semibold text-gray-500">{"/"}</span>
            <RepoModal repoName={router.query.repoName as string} />
            <span className="text-xl font-semibold text-gray-500">{"/"}</span>
            <RepoDirModal repoDir={repoDir} />
          </div>
        )}
        <div className="ml-auto flex gap-5 font-medium text-white">
          <KeyModal />
          <SignOutButton />
        </div>
      </div>
      <main className="flex flex-col bg-[#0d1116] px-20 py-12 h-[calc(100vh-7rem)]">
        {props.children}
      </main>
    </div>
  );
};
