import { getUser } from "@/app/actions/getUser";
import { getReservations } from "@/app/actions/reservation";
import BookedCard from "@/components/BookedCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const Bookings = async () => {
  const user = await getUser();
  if (!user) notFound();

  const { data: reservations } = await getReservations();
  if (reservations.length == 0) {
    return (
      <section className=" h-screen   lg:h-[88vh] grid place-items-center">
        <div className=" text-center">
          <h1 className=" text-3xl font-semibold">No Reservations Found!</h1>
          <Link className=" underline" href="/"> Book yours Today </Link>
        </div>
      </section>
    );
  }
  return (
    <div className=" p-4 md:p-8">
      <div className=" grid grid-cols-2 md:grid-cols-4 gap-5 p-2">
        {reservations.map((each, index) => (
          <BookedCard key={each.id} reservation={each} />
        ))}
      </div>
    </div>
  );
};

export default Bookings;
