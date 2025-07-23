import ListingCard from "@/components/ListingCard";
import { getListings } from "./actions/getListings";

export const metadata={
  title:"Homora:"
}

export default async function Home({ searchParams }) {
  const listings = await getListings(searchParams);

  if(listings.length==0){
    return(
      <section className=" w-full h-[90vh] grid place-items-center">
       <div>
         <h1 className=" text-3xl font-semibold">No Listings Found!</h1>
        <p>Maybe change your filters.</p>
       </div>
      </section>
    )
  }

  return (
    <section className=" p-4 md:p-6">
      <div className=" grid grid-cols-2 md:grid-cols-4 gap-4">
      {
        listings.map((listing)=>{
          return <ListingCard key={listing.id} listing={listing}/>
        })
      }
    </div>
    </section>
  );
}
