"use server";

import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/prisma";

export async function deleteProperty(id) {
  const session = await getAuthSession();
  if (!session) {
    return { ok: false, message: "Not Authorized!", status: 403 };
  }

  await prisma.reservation.deleteMany({
    where: { listingId: id }
  });

  const res = await prisma.listing.deleteMany({
    where: {
      id: id,
      userId: session.user.id
    }
  });

  if (res.count === 0) {
    return {
      ok: false,
      message: "Could not find property to delete",
      status: 404
    };
  }

  return { ok: true, message: "Deleted", status: 200 };
}
