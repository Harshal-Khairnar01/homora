"use client";

import { CircleUserRound, Search } from "lucide-react";
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
    <div className=" px-5 md:px-16 flex lg:px-20  justify-between py-3 bg-muted items-center border-b">
      <Link href="/" className="logo flex gap-2 items-center">
        <Icons.logo className=" w-6 " />
        <span className=" text-red-400 font-semibold text-lg">Homora</span>
      </Link>
      <div className="search-feature flex items-center gap-3 bg-white border-2 border-gray-300 px-4 py-2 rounded-full">
        <div
          className="  hover:bg-gray-200  transition-colors duration-200 cursor-pointer px-3 py-1 rounded-full"
          onClick={() => openSearchModalStep(0)}
        >
          Location
        </div>
        <div className=" bg-gray-300 h-[20px] w-[0.7px]"></div>
        <div
          className="  hover:bg-gray-200  transition-colors duration-200 cursor-pointer px-3 py-1 rounded-full"
          onClick={() => openSearchModalStep(1)}
        >
          Date
        </div>
        <div className=" bg-gray-300 h-[20px] w-[0.7px]"></div>
        <div
          className="  hover:bg-gray-200  transition-colors duration-200 cursor-pointer px-3 py-1 rounded-full"
          onClick={() => openSearchModalStep(2)}
        >
          Details
        </div>
        <div
          className="  rounded-full bg-red-400 text-white p-2 cursor-pointer hover:scale-[1.05] duration-200 delay-100"
          onClick={() => openSearchModalStep(0)}
        >
          <Search />
        </div>
      </div>

      <div className=" flex gap-5 ">
        <Link
          href="/become-a-host"
          className=" text-black bg-gray-300 rounded-full px-2 text-sm flex justify-center items-center hover:scale-[1.02] transition-all duration-150"
        >
          Become a host
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

const UserComponent = ({user}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" outline-none">
        <CircleUserRound className=" text-red-500" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          {" "}
          <Link href="/bookings"> My Bookings </Link>{" "}
        </DropdownMenuItem>
        <DropdownMenuItem>
          {" "}
          <Link href="/favorites"> My Favorites </Link>{" "}
        </DropdownMenuItem>
        <DropdownMenuItem>
          {" "}
          <Link href="/properties"> My Properties </Link>{" "}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {user ? (
          <DropdownMenuItem>
            <SignOut />
          </DropdownMenuItem>
        ):(
          <DropdownMenuItem>
           <Link href="/sign-in">Sign in</Link>
          </DropdownMenuItem>
        )
      }
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
