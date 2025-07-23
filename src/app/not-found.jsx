
import Link from "next/link";
import React from "react";

const cutom404Page = () => {
  return (
    <section className=" h-[90vh] grid place-items-center">
      <div>
        <h1 className=" font-bold text-xl sm:text-2xl md:text-5xl lg:text-7xl">
          404
        </h1>
        <Link className="underline" href="/">
          Go to Homepage
        </Link>
      </div>
    </section>
  );
};

export default cutom404Page;
