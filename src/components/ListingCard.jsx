import useCountries from "@/hooks/useCountries";
import { IndianRupee } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ListingCard = ({ listing }) => {
  const { getByValue } = useCountries();
  const countryDetails = getByValue(listing.locationValue);
  return (
    <Link href={`/listings/${listing.id}`} className=" p-3 rounded shadow border border-gray-200">
      <div className="w-full aspect-square rounded-lg  ">
        <Image
          className=" object-cover w-full h-full rounded-lg"
          src={listing.imageSrc}
          width={400}
          height={400}
          alt={listing.title}
        />
      </div>

      <p className=" font-semibold text-lg md:text-2xl capitalize pt-2">{listing.title}</p>
      <p className=" text-lg flex gap-1 items-center">
        <IndianRupee size={15} />
        {listing.price} per night
      </p>
      <div className=" text-gray-500">
        {countryDetails.label},&nbsp;
        {countryDetails.region}
      </div>
    </Link>
  );
};

export default ListingCard;
