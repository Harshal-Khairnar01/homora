import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const session=await getAuthSession();

  if(!session || !session.user){
    return NextResponse.json({message:"Not Authorized!"},{status:403})
  }

  const {
    category,
    title,
    description,
    roomCount,
    guestCount,
    childCount,
    imageSrc,
    location,
    price,
  } = body;

  const newListing = await prisma.listing.create({
    data: {
      category,
      title,
      description,
      roomCount,
      guestCount,
      childCount,
      imageSrc,
      locationValue:location.value,
      price:parseInt(price,10),
      userId:session?.user.id
    },
  });

  return NextResponse.json({message:"Created Successfully!",listing:newListing}, {status:201});
}
