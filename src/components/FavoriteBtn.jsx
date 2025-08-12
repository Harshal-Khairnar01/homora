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
        width={30}
        height={30}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
        style={{
          color: color,
        }}
      >
        <g transform="translate(0 -1028.4)">
          <path
            d="m7 1031.4c-1.5355 0-3.0784 0.5-4.25 1.7-2.3431 2.4-2.2788 6.1 0 8.5l9.25 9.8 9.25-9.8c2.279-2.4 2.343-6.1 0-8.5-2.343-2.3-6.157-2.3-8.5 0l-0.75 0.8-0.75-0.8c-1.172-1.2-2.7145-1.7-4.25-1.7z"
            fill="currentColor"
          />
        </g>
      </svg>
    </div>
  );
};

export default FavoriteBtn;
