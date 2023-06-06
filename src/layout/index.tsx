import { SignOutButton } from "@clerk/nextjs";
import type { PropsWithChildren } from "react";
import KeyModal from "./keymodal";
import Link from "next/link";

export const Layout = (props: PropsWithChildren) => {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex h-20 flex-row items-center bg-[#161b22] px-20">
        <Link href={'/'}>
        <span className="text-lg text-white font-semibold">GITJUB</span>
        </Link>
        <div className="ml-auto flex gap-8 text-white font-semibold">
          <KeyModal />
          <SignOutButton />
        </div>
      </div>
      <main className="flex flex-1 bg-[#0d1116] px-20 pt-4">{props.children}</main>
    </div>
  );
};
