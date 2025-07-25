"use server";

import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/prisma";

export async function setReservation({ listingId, startDate, endDate, totalPrice }) {
  const session = await getAuthSession();

  if (!session || !session.user) {
    return { ok: false, message: "Not permitted", status: 403 };
  }

  if (!listingId || !startDate || !endDate || !totalPrice) {
    return { ok: false, message: "Missing Fields", status: 400 };
  }

  try {
    const listAReservation = await prisma.listing.update({
      where: { id: listingId },
      data: {
        reservations: {
          create: {
            userId: session.user.id,
            startDate,
            endDate,
            totalPrice
          },
        },
      },
    });

    return { ok: true, message: "reserved", status: 201 };
  } catch (error) {
    return { ok: false, message: error.message, status: 500 };
  }
}
