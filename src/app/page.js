import ListingCard from "@/components/ListingCard";
import { getListings } from "./actions/getListings";
import CategoryHandler from "@/components/CategoryHandler";

export const metadata = {
  title: "Homora:",
};

export default async function Home({ searchParams }) {
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
    <section className=" ">
      <CategoryHandler />
      <div className=" grid grid-cols-2 md:grid-cols-4 gap-4 p-4 md:p-6">
        {listings.map((listing) => {
          return <ListingCard key={listing.id} listing={listing} />;
        })}
      </div>
    </section>
  );
}
