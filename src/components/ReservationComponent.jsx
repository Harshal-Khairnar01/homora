"use client";

import React, { useEffect, useMemo, useState } from "react";
import CalenderInput from "./CalenderInput";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { Button } from "./ui/button";
import { IndianRupee } from "lucide-react";
import formatMoney from "@/utils/formatMoney";
import { setReservation } from "@/app/actions/reservation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ReservationComponent = ({ pricePerDay, listingId, reservations }) => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const [totalPrice, setTotalPrice] = useState(pricePerDay);

  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates = [];
    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });
      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const countDays = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      if (pricePerDay && countDays) {
        setTotalPrice(countDays * pricePerDay);
      } else {
        setTotalPrice(pricePerDay);
      }
    }
  }, [pricePerDay, dateRange]);

  const handleReservation = async () => {
    try {
      const res = await setReservation({
        listingId,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        totalPrice,
      });
      if (res.ok) {
        toast("Yee! Property Booked!");
        router.push("/bookings");
      }
    } catch (error) {
      toast.error("oh uh! Error Occured!");
    }
  };

  return (
    <div className=" flex flex-col gap-3 items-center py-2">
      <CalenderInput
        className="w-full"
        value={dateRange}
        onChange={(value) => setDateRange(value.selection)}
        disabledDates={disabledDates}
      />
      <Button
        onClick={handleReservation}
        className=" w-full flex items-center gap-2"
      >
        Book for{" "}
        <span className=" flex items-center">
          <IndianRupee />
          {formatMoney(totalPrice)}
        </span>
      </Button>
    </div>
  );
};

export default ReservationComponent;
