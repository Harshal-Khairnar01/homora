"use client";

import { cn } from "@/lib/utils";
import { categories } from "@/static/config";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const CategoryHandler = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeCat = searchParams.get("cat");

  const params = new URLSearchParams(searchParams.toString());

  const setCategory = (cat) => {
    params.set("cat", cat);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className=" w-full flex justify-evenly gap-3 px-10    border-b overflow-x-auto">
      {categories.map((cat) => {
        return (
          <div
            onClick={() => setCategory(cat.label)}
            className={cn(
              " flex flex-col gap-1 items-center  cursor-pointer bg-gray-100/40 transition-colors duration-200 delay-100 p-4 rounded hover:text-red-400",
              activeCat==cat.label && ' bg-gray-100/40 text-red-400'
            )}
            key={cat.label}
          >
            <cat.icon />
            {cat.label}
          </div>
        );
      })}
    </div>
  );
};

export default CategoryHandler;
