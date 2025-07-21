import BecomeAHostComponent from "@/components/BecomeAHostComponent";
import { getAuthSession } from "@/utils/auth";
import Link from "next/link";
import React from "react";

const BecomeAHost = async () => {
  const session = await getAuthSession();
  if (!session) {
    return (
      <section className=" w-full h-[80vh] grid place-items-center">
        <div>
          <h1 className=" text-xl md:text-2xl font-bold">Not Authorized</h1>
          <span>
            To add Your Properties, <Link className=" underline" href="/sign-in">Sign In</Link>
          </span>
        </div>
      </section>
    );
  }
  return (
    <div>
     <BecomeAHostComponent/>
    </div>
  );
};

export default BecomeAHost;
