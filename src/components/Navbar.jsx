"use client";

import { CircleUserRound, Home, Search } from "lucide-react";
import { Icons } from "./icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState } from "react";
import SearchModal from "./SearchModal";
import Link from "next/link";
import SignOut from "./SignOut";

export default function Navbar({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalStateStep, setModalStateStep] = useState(-1);

  const openSearchModalStep = (step) => {
    if (!isOpen) {
      setIsOpen(true);
      setModalStateStep(step);
    }
  };

  return (
    <div className="w-full px-4 md:px-16 lg:px-20 py-3 bg-muted items-center border-b flex justify-between">
      <Link href="/" className="logo flex gap-2 items-center">
        <Icons.logo className=" w-12 md:w-6" />
        <span className="text-red-400 font-semibold text-lg hidden md:block">
          Homora
        </span>
      </Link>

      <div
        className="search-feature flex items-center gap-3 bg-white border-2 border-gray-300 px-4 py-2 rounded-full cursor-pointer transition-shadow duration-200 hover:shadow-md md:w-auto w-full justify-between"
        onClick={() => openSearchModalStep(0)}
      >
        <div className="hidden md:flex items-center gap-3">
          <span className="hover:bg-gray-200 transition-colors duration-200 cursor-pointer px-3 py-1 rounded-full">
            Location
          </span>
          <div className="bg-gray-300 h-[20px] w-[0.7px]"></div>
          <span className="hover:bg-gray-200 transition-colors duration-200 cursor-pointer px-3 py-1 rounded-full">
            Date
          </span>
          <div className="bg-gray-300 h-[20px] w-[0.7px]"></div>
          <span className="hover:bg-gray-200 transition-colors duration-200 cursor-pointer px-3 py-1 rounded-full">
            Details
          </span>
        </div>
        <div className="rounded-full bg-red-400 text-white p-2 hover:scale-[1.05] duration-200 delay-100">
          <Search />
        </div>
      </div>

      <div className="flex gap-1 md:gap-5 items-center p-4 md:p-1">
        <Link
          href="/become-a-host"
          className="text-black rounded-full px-2 text-sm flex justify-center items-center hover:scale-[1.02] transition-all duration-150"
        >
          <span className="hidden md:block hover:bg-gray-200 px-2 py-1 rounded-full">
            Become a host
          </span>
          <span className="md:hidden">
            <Home   className=" p-1 hover:bg-gray-200 text-xl rounded-full" />
          </span>
        </Link>
        <UserComponent user={user} />
      </div>

      <SearchModal
        key={modalStateStep}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        stepAt={modalStateStep}
      />
    </div>
  );
}

const UserComponent = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <CircleUserRound className="text-red-500" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {user ? (
          <>
            <DropdownMenuItem>
              <Link href="/bookings"> My Bookings </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/favorites"> My Favorites </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/properties"> My Properties </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <SignOut />
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem>
            <Link href="/sign-in">Sign in</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
