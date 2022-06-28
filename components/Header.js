import Image from "next/image";
import React from "react";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import { modalState } from "../atom/modalAtom";
import { useRouter } from "next/router";
function Header() {
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="sticky top-0 z-50 border-b bg-white shadow-sm ">
      <div className="mx-5 flex max-w-6xl justify-between lg:mx-auto">
        <div className="relative hidden w-24 cursor-pointer lg:inline-grid ">
          <Image
            src="https://links.papareact.com/ocw"
            onClick={() => router.push("/")}
            objectFit="contain"
            layout="fill"
          />
        </div>

        <div className="relative w-10 flex-shrink-0 lg:hidden">
          <Image
            src="https://links.papareact.com/jjm"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="max-w-xs">
          <div className="relative mt-1 rounded-md p-3">
            <div className="pointer-events-none absolute inset-y-0 flex items-center pl-3">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="block w-full rounded-md border-gray-300 bg-gray-50 pl-10 focus:border-black focus:ring-black sm:text-sm "
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon className="navbtn" />
          <MenuIcon className="h-6 cursor-pointer md:hidden" />
          {session ? (
            <>
              <div className="navbtn relative">
                <PaperAirplaneIcon className="navbtn rotate-45" />
                <h3 className="w-5h-5 absolute -top-2 -right-2 animate-pulse items-center justify-center rounded-full bg-red-500 px-2 py-1 text-xs text-white ">
                  3
                </h3>
              </div>
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="navbtn"
              />
              <UserGroupIcon className="navbtn" />
              <HeartIcon className="navbtn" />

              <img
                src={session.user?.image}
                alt=""
                className="h-10 cursor-pointer rounded-full"
                onClick={signOut}
              />
            </>
          ) : (
            <button className="font-bold text-[17px]" onClick={signIn}>
              SignIn
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
