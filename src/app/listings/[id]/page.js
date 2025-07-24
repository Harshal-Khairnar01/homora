import getListingById from "@/app/actions/getListingById";
import ReservationComponent from "@/components/ReservationComponent";
import useCountries from "@/hooks/useCountries";
import { categories } from "@/static/config";

import { Baby, House, IndianRupee, UserRound } from "lucide-react";
import Image from "next/image";

export default async function SignleListingPage({ params }) {
  const data = await getListingById(params.id);

  const { getByValue } = useCountries();
  const country = getByValue(data.locationValue);

  const foundCategory = categories.filter(
    (cate) => cate.label == data.category
  )[0];

  return (
    <div className=" p-4 md:p-8">
     <div className=" main-wrapper  w-full md:w-[60%] mx-auto">
         <h1 className=" text-xl font-bold sm:text-2xl md:text-5xl lg:text-7xl">
        {data.title}
      </h1>
      <div className="  text-xl text-gray-500 my-1">
        {country.label},&nbsp;
        {country.region}
      </div>
      <Image
        className="  w-full rounded-lg  mt-3  mb-5"
        src={data.imageSrc}
        width={600}
        height={340}
        alt={data.title}
      />
      <div className=" grid grid-cols-5 gap-10">
        <div className="left col-span-5 lg:col-span-3 space-y-4">
          <div className=" flex flow-row items-center gap-2">
            <h5>
              Hosted by <span className=" font-semibold">{data.user.name}</span>
            </h5>
            <Image
              className=" rounded-full"
              src={data.user.image}
              width={30}
              height={30}
              alt="owner"
            />
          </div>
          <hr />
          <div className=" flex gap-4">
            <span className=" p-3 bg-red-100/40  rounded-lg font-semibold px-5 flex flex-col items-center">
              <UserRound />
              Guest:{data.guestCount}
            </span>
            <span className=" p-3 bg-red-100/40  rounded-lg font-semibold px-5 flex flex-col items-center">
              <House />
              Rooms:{data.roomCount}
            </span>
            <span className=" p-3 bg-red-100/40  rounded-lg font-semibold px-5 flex flex-col items-center">
              <Baby />
              Children:{data.childCount}
            </span>
          </div>
          <hr />
          <div className=" flex gap-2 items-center">
            <foundCategory.icon size={50} className=" text-zinc-500 p-2" />
            <span className=" text-sm">
             <p className=" text-xl font-semibold text-gray-600"> {foundCategory.label}</p>
              <p>
                {foundCategory.label} is the speciality of this property
              </p>
            </span>
          </div>
          <hr />
          <div>
            <span className="font-extrabold text-2xl">
              <span className="text-red-400">homora</span> shield
            </span>
            <p>
              Every booking is backed by Homora Shield — free protection against
              unexpected cancellations, listing mismatches, and check-in issues,
              ensuring peace of mind every step of the way.
            </p>
            <a className=" font-bold underline" href="#">
              Learn More
            </a>
            <hr />
            <div
              className=" description"
              dangerouslySetInnerHTML={{
                __html: data.description.replaceAll(/\n/g, "<br/>"),
              }}
            ></div>
          </div>
        </div>
        <div className="right col-span-5 lg:col-span-2">
          <div className=" bg-gray-300 rounded-lg p-3">

           <span className=" flex items-center gap-1"> <IndianRupee/> <span className=" text-xl font-bold">{data.price}</span>/night</span>

           <ReservationComponent />
          </div>

        </div>
      </div>
     </div>
    </div>
  );
}
