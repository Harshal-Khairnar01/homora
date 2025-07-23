"use client";

import { X } from "lucide-react";
import React, { useCallback, useState } from "react";
import { Button } from "./ui/button";
import CountrySelect from "./CountrySelect";
import CalenderInput from "./CalenderInput";
import CounterInput from "./CounterInput";
import { useRouter, useSearchParams } from "next/navigation";

const STEPS = {
  LOCATION: 0,
  DATE: 1,
  DETAILS: 2,
};

const SearchModal = ({ isOpen, setIsOpen, stepAt }) => {
  const [step, setStep] = useState(stepAt || STEPS.LOCATION);

  const [location, setLocation] = useState();
  const [guestCount, setGuestCount] = useState(2);
  const [roomCount, setRoomCount] = useState(1);
  const [childCount, setChildCount] = useState(1);

  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const router = useRouter();
  const searchParams=useSearchParams();

  const sourceToReturn = {
    [STEPS.LOCATION]: (
      <div>
        <h2>Where are you planning to visit?</h2>
        <CountrySelect
          value={location}
          onChange={(value) => setLocation(value)}
        />
      </div>
    ),
    [STEPS.DATE]: (
      <div>
        <CalenderInput
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    ),
    [STEPS.DETAILS]: (
      <div>
        <div className=" flex  justify-between gap-5">
          <h3>How many guests are joining?</h3>
          <CounterInput value={guestCount} onChange={setGuestCount} />
        </div>
        <div className=" h-[0.4px] w-full bg-gray-500 my-5" />

        <div className=" flex  justify-between gap-5">
          <h3>How many rooms do you need?</h3>
          <CounterInput value={roomCount} onChange={setRoomCount} />
        </div>
        <div className=" h-[0.4px] w-full bg-gray-500 my-5" />
        <div className=" flex  justify-between gap-5">
          <h3>How many children are joining?</h3>
          <CounterInput value={childCount} onChange={setChildCount} />
        </div>
      </div>
    ),
  };

  const onBack = () => {
    if (step == 0) return;
    setStep((prev) => prev - 1);
  };

  const onNext = useCallback(() => {
    if (step == Object.keys(STEPS).length - 1) {
      const trackOfQueryParams = {
        ...(location?.value && { locationValue: location.value }),
        ...(guestCount && { guestCount: guestCount }),
        ...(roomCount && { roomCount: roomCount }),
        ...(childCount && { childCount: childCount }),
        ...(dateRange.startDate &&
          dateRange.endDate && {
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
          }),
      };

      if (Object.keys(trackOfQueryParams).length === 0) return;

      const queryString = Object.keys(trackOfQueryParams)
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(
              trackOfQueryParams[key]
            )}`
        )
        .join("&");

      
        const params=new URLSearchParams(searchParams.toString());

        const tempCat=params.get('cat');


      const url = `/?${queryString}&cat=${tempCat}`;
      setIsOpen(false);
      setStep(STEPS.LOCATION);
      router.push(url);
    }
    setStep((prev) => prev + 1);
  }, [step, location, guestCount, roomCount, childCount, dateRange]);

  const labelForLastButton =
    step == Object.keys(STEPS).length - 1 ? "Search" : "Next";

  return (
    <>
      {isOpen && (
        <div className=" fixed top-0 left-0  w-full h-screen">
          <div className=" w-full relative h-screen bg-black/50">
            <div className="modal_content absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-full md:w-3/5 min-h-[300px]  text-black p-5 rounded-md shadow-lg">
              {sourceToReturn[step]}
              <X
                onClick={() => setIsOpen(false)}
                className=" absolute  float-right top-3 right-3  cursor-pointer"
              />
              <div className="  w-full flex justify-between pt-5">
                <Button onClick={onBack} disabled={step === STEPS.LOCATION}>
                  Back
                </Button>
                <Button
                  className={
                    step == Object.keys(STEPS).length - 1 &&
                    "bg-red-400 hover:bg-red-300"
                  }
                  onClick={onNext}
                >
                  {labelForLastButton}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchModal;
