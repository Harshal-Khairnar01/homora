"use client";
import useFavorite from "@/hooks/useFavorite";
import { cn } from "@/lib/utils";
import { Bookmark } from "lucide-react";
import React from "react";

const FavoriteBtn = ({ listingId, user, className, props }) => {
  const { isFavorite, toggleFavorite } = useFavorite({
    listingId: listingId,
    user: user,
  });
  const color = isFavorite ? "red" : "black";

  const handleFavorite = (e) => {
    e.preventDefault();
    toggleFavorite();
  };

  return (
    <div onClick={handleFavorite} className={cn("", className)}>
      <svg
        width={35}
        height={35}
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        style={{
          color: color,
        }}
      >
        <path
          fill="currentColor"
          d="M34.6,6c-3.4,0-6.4,1.6-8.6,4.1C23.8,7.6,20.8,6,17.4,6
       C11.9,6,7,10.9,7,16.4c0,10.3,16,21.6,16,21.6s16-11.3,16-21.6
       C39,10.9,34.1,6,34.6,6z"
        />
      </svg>
    </div>
  );
};

export default FavoriteBtn;
