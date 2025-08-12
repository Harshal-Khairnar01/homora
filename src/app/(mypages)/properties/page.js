import ListingCard from "@/components/ListingCard";
import PropertyBox from "@/components/PropertyBox";
import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const Properties = async () => {
  const session = await getAuthSession();
  if (!session) notFound();

  const propertiesList = await prisma.listing.findMany({
    where: { userId: session.user.id },
  });

  if (propertiesList.length == 0) {
    return (
      <section className=" h-screen   lg:h-[88vh] grid place-items-center">
        <div className=" text-center">
          <h1 className=" text-3xl font-semibold">
            No Properties added so far!
          </h1>
          <Link className=" underline" href="/become-a-host">
            {" "}
            Add yours Today{" "}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div className=" p-4 md:p-8">
      <h1 className=" text-2xl font-semibold mb-3">My Properties</h1>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 p-2">
        {propertiesList.map((each) => (
          <PropertyBox each={each} key={each.id} />
        ))}
      </div>
    </div>
  );
};

export default Properties;
