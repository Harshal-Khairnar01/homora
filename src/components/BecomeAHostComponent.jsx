"use client";

import useCountries from "@/hooks/useCountries";
import { cn } from "@/lib/utils";
import { categories } from "@/static/config";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import CountrySelect from "./CountrySelect";
import { Input } from "./ui/input";
import CounterInput from "./CounterInput";
import ImageUpload from "./ImageUpload";
import { Textarea } from "./ui/textarea";
import {
  ArrowLeft,
  ArrowLeftCircle,
  ArrowRight,
  ArrowRightCircle,
} from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const STEPS = {
  CATEGORY: 0,
  LOCATION: 1,
  INFO: 2,
  IMAGES: 3,
  DESCRIPTION: 4,
  PRICE: 5,
};

const BecomeAHostComponent = () => {
  const [step, setStep] = useState(STEPS.CATEGORY);
  const router = useRouter();

  const setCustomValue = (title, value) => {
    setValue(title, value);
  };

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      category: "",
      roomCount: 1,
      childCount: 0,
      guestCount: 1,
      title: "",
      description: "",
      price: null,
    },
  });

  const category = watch("category");
  const location = watch("location");
  const roomCount = watch("roomCount");
  const childCount = watch("childCount");
  const guestCount = watch("guestCount");
  const imageSrc = watch("imageSrc");

  const isStepValid = useMemo(() => {
    switch (step) {
      case STEPS.CATEGORY:
        return !!category;
      case STEPS.LOCATION:
        return !!location;
      case STEPS.INFO:
        return roomCount > 0 && guestCount > 0;
      case STEPS.IMAGES:
        return !!imageSrc;
      case STEPS.DESCRIPTION:
        return !!watch("title") && !!watch("description");
      case STEPS.PRICE:
        return !!watch("price") && parseFloat(watch("price")) > 0;
      default:
        return true;
    }
  }, [
    step,
    category,
    location,
    roomCount,
    childCount,
    guestCount,
    imageSrc,
    watch(),
  ]);

  const onBack = () => {
    setStep((step) => step - 1);
  };
  const onNext = (data) => {
    if (step !== STEPS.PRICE) setStep((step) => step + 1);
    else {
      axios.post(`api/v1/listing`, data).then(() => {
        toast("Yee! Property Listed!");
        router.push("/properties");
      });
    }
  };

  const nextLable = useMemo(() => {
    if (step == STEPS.PRICE) {
      return (
        <span className=" flex flex-row gap-2 items-center text-white font-semibold">
          List <ArrowRight size={20} className=" text-white" />{" "}
        </span>
      );
    } else return <ArrowRight size={20} className=" text-white" />;
  });

  let sourceAtStep = (
    <div className=" flex flex-col gap-3">
      <h1 className="text-lg md:text-xl font-semibold text-gray-700 ">
        Which Of these categories does define your property
      </h1>
      <p>Pick a category</p>
      <div className=" grid grid-cols-4 gap-3">
        {categories.map((each) => {
          return (
            <div
              key={each.label}
              onClick={() => setCustomValue("category", each.label)}
              className={cn(
                "flex flex-col items-center p-5 rounded-lg border-gray-300/20 bg-gray-100 cursor-pointer",
                category == each.label
                  ? "bg-red-400/80 text-white"
                  : "bg-gray-100"
              )}
            >
              <each.icon />
              <span>{each.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (step == STEPS.LOCATION) {
    sourceAtStep = (
      <div className=" flex flex-col gap-3">
        <h1 className="text-lg md:text-xl font-semibold text-gray-700 ">
          Where is your property based out of
        </h1>
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
      </div>
    );
  } else if (step == STEPS.INFO) {
    sourceAtStep = (
      <div className=" flex flex-col gap-3">
        <h1 className="text-lg md:text-xl font-semibold text-gray-700 ">
          Choose your references
        </h1>
        <div className=" flex justify-between">
          <span>
            <h3 className=" text-lg font-semibold text-gray-600">
              How many rooms do you want?
            </h3>
            <h5>Choose a room count</h5>
          </span>
          <CounterInput
            value={roomCount}
            onChange={(value) => setCustomValue("roomCount", value)}
          />
        </div>
        <div className=" w-full h-[0.4px] bg-gray-800 my-5" />
        <div className=" flex justify-between">
          <span>
            <h3 className=" text-lg font-semibold text-gray-600">
              How many children do you have?
            </h3>
            <h5>Choose a children count</h5>
          </span>
          <CounterInput
            value={childCount}
            onChange={(value) => setCustomValue("childCount", value)}
          />
        </div>
        <div className=" w-full h-[0.4px] bg-gray-800 my-5" />
        <div className=" flex justify-between">
          <span>
            <h3 className=" text-lg font-semibold text-gray-600">
              How many Adults are planning to join?
            </h3>
            <h5>Choose a guest count</h5>
          </span>
          <CounterInput
            value={guestCount}
            onChange={(value) => setCustomValue("guestCount", value)}
          />
        </div>
      </div>
    );
  } else if (step == STEPS.IMAGES) {
    sourceAtStep = (
      <div className=" flex flex-col gap-3">
        <h1 className="text-lg md:text-xl font-semibold text-gray-700 ">
          Upload a great image of your property
        </h1>
        {imageSrc && (
          <Image src={imageSrc} width={500} height={300} alt="property Image" />
        )}
        <ImageUpload
          value={imageSrc}
          returnUrl={(url) => setCustomValue("imageSrc", url)}
        />
      </div>
    );
  } else if (step == STEPS.DESCRIPTION) {
    sourceAtStep = (
      <div className=" flex flex-col gap-3">
        <h1 className="text-lg md:text-xl font-semibold text-gray-700 ">
          A bit of details on your property
        </h1>
        <Input
          {...register("title")}
          placeholder="title about your property"
          className=" w-full"
        />
        <Textarea
          {...register("description")}
          placeholder="What is the story behind your property?"
          className=" w-full"
        />
      </div>
    );
  } else if (step == STEPS.PRICE) {
    sourceAtStep = (
      <div className=" flex flex-col gap-3">
        <h1 className="text-lg md:text-xl font-semibold text-gray-700 ">
          How much do you charge for your property per night?
        </h1>
        <Input
          {...register("price")}
          placeholder="e.g 1000"
          className=" w-full"
        />
      </div>
    );
  }

  return (
    <section>
      <div className=" p-4 md:p-8 ">{sourceAtStep}</div>
      <div className="  w-full flex  flex-col gap-2 fixed bottom-0 ">
        <div className=" w-full flex justify-between px-12">
          <button
            onClick={onBack}
            className=" p-4  rounded-full bg-red-400 cursor-pointer"
          >
            <ArrowLeft size={20} className=" text-white" />
          </button>
          <button
            onClick={handleSubmit(onNext)}
            className=" p-4  rounded-full bg-red-400 cursor-pointer disabled:bg-gray-400"
            disabled={!isStepValid}
          >
            {nextLable}
          </button>
        </div>
        <div
          className="progress-bar bg-red-400 h-2"
          style={{
            width: `${((step + 1) / Object.keys(STEPS).length) * 100}%`,
          }}
        ></div>
      </div>
    </section>
  );
};
export default BecomeAHostComponent;
