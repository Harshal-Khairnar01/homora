import { getFavorites } from "@/app/actions/favorites";
import { getUser } from "@/app/actions/getUser";
import BookedCard from "@/components/BookedCard";
import ListingCard from "@/components/ListingCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const Favorites = async () => {
  const user = await getUser();
  if (!user) notFound();

  const { data: favorites } = await getFavorites();
  if (favorites.length == 0) {
    return (
      <section className=" h-screen   lg:h-[88vh] grid place-items-center">
        <div className=" text-center">
          <h1 className=" text-3xl font-semibold">No Favoritess Found!</h1>
          <Link className=" underline" href="/">
            {" "}
            Add yours Today{" "}
          </Link>
        </div>
      </section>
    );
  }
  return (
    <div className=" p-4 md:p-8">
      <h1 className=" text-2xl font-semibold mb-3">My Favorites</h1>
      <div className=" grid grid-cols-2 md:grid-cols-4 gap-5 p-2">
        {favorites.map((each) => (
          <ListingCard key={each.id} listing={each} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
