import ListingCard from "@/components/ListingCard";
import { getListings } from "./actions/getListings";
import CategoryHandler from "@/components/CategoryHandler";
import { getAuthSession } from "@/utils/auth";
import { getUser } from "./actions/getUser";

export default async function Home({ searchParams }) {
  const user = await getUser();
  const listings = await getListings(searchParams);

  if (listings.length == 0) {
    return (
      <section>
        <CategoryHandler />
        <div className=" w-full h-[80vh] grid place-items-center">
          <div>
            <h1 className=" text-3xl font-semibold">No Listings Found!</h1>
            <p>Maybe change your filters.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="">
      <CategoryHandler />
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 p-2">
        {listings.map((listing) => {
          return <ListingCard user={user} key={listing.id} listing={listing} />;
        })}
      </div>
    </section>
  );
}
