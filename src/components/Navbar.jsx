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

export default function Navbar() {
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
      <div className="logo flex gap-2 items-center">
        <Icons.logo className=" w-6 " />
        <span className=" text-red-400 font-semibold text-lg">Homora</span>
      </div>
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
      <div>
        <UserComponent />
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

const UserComponent = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" outline-none">
        <CircleUserRound className=" text-red-500" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem> <Link href="/bookings">  My Bookings  </Link> </DropdownMenuItem>
        <DropdownMenuItem> <Link href="/favorites">  My Favorites  </Link> </DropdownMenuItem>
        <DropdownMenuItem> <Link href="/properties">  My Properties  </Link> </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Airbnb your home</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
