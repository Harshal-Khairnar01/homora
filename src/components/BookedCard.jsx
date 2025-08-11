"use client";
import React from "react";
import ListingCard from "./ListingCard";
import { deleteReservation } from "@/app/actions/reservation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const BookedCard = ({ reservation }) => {
  const router = useRouter();
  const cancelReservation = async (e) => {
    e.preventDefault();
    const res = await deleteReservation(reservation.id);
    if (res.ok) {
      toast.success("deleted");
      router.refresh();
    }
  };
  return (
    <div>
      <ListingCard
      reservationData={reservation}
        listing={reservation.listing}
        showSecondaryButton={true}
        secondaryBtnLabel={"Cancel Booking"}
        onAction={cancelReservation}
      />
    </div>
  );
};

export default BookedCard;
