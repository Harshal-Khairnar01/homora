import useCountries from "@/hooks/useCountries";
import { IndianRupee } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import formatMoney from "@/utils/formatMoney";
import FavoriteBtn from "./FavoriteBtn";

const ListingCard = ({
  user,
  reservationData,
  listing,
  showSecondaryButton = false,
  secondaryBtnLabel,
  onAction,
}) => {
  const { getByValue } = useCountries();
  const countryDetails = getByValue(listing.locationValue);
  return (
    <Link
      href={`/listings/${listing.id}`}
      className=" p-3 shadow border border-gray-200 relative   rounded-md hover:scale-[1.01] hover:bg-gray-100 transition-all duration-200 delay-100"
    >
      <div className="w-full aspect-square rounded-lg  ">
        <Image
          className=" object-cover w-full h-full rounded-lg"
          src={listing.imageSrc}
          width={400}
          height={400}
          alt={listing.title}
        />
      </div>
      <FavoriteBtn
        user={user}
        listingId={listing.id}
        className=" absolute top-6 right-6  text-red-500"
      />

      <p className=" font-semibold text-lg md:text-xl capitalize pt-2">
        {listing.title}
      </p>
      {reservationData ? (
        <div>
          <p className=" font-semibold text-gray-800">
            Paid {formatMoney(reservationData.totalPrice)} rupees
          </p>
          <p className=" text-xs">
            {new Date(reservationData.startDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}{" "}
            to{" "}
            {new Date(reservationData.endDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      ) : (
        <p className=" text-base flex gap-1 items-center">
          <IndianRupee size={15} />
          {formatMoney(listing.price)} per night
        </p>
      )}
      <div className=" text-gray-500 text-sm ">
        {countryDetails.label},&nbsp;
        {countryDetails.region}
      </div>
      {showSecondaryButton && (
        <Button onClick={onAction}>{secondaryBtnLabel}</Button>
      )}
    </Link>
  );
};

export default ListingCard;
