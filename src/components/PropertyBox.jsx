"use client";

import React from "react";
import ListingCard from "./ListingCard";
import { deleteProperty } from "@/app/actions/deleteProperty";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const PropertyBox = ({ each }) => {
  const router = useRouter();
  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await deleteProperty(each.id);

    if (res.ok) {
      toast.success("Property Deleted!");
      router.refresh();
    }
  };

  return (
    <ListingCard
      listing={each}
      showSecondaryButton={true}
      secondaryBtnLabel={"Delete this property"}
      onAction={handleDelete}
    />
  );
};

export default PropertyBox;
