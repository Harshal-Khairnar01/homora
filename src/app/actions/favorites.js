"use server";

import { prisma } from "@/utils/prisma";
import { getUser } from "./getUser";

export async function setFavorite(id) {
  const user = await getUser();
  if (!user) return { ok: false, message: "Not auth", status: 403 };
  if (!id || typeof id !== "string") {
    return { ok: false, message: "Id mismatch", status: 404 };
  }
  let favorite = [...(user.favorite || [])];
  favorite.push(id);

  try {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        favorite: favorite,
      },
    });
    return { ok: true, message: "Updated", status: 201 };
  } catch (error) {
    console.log(error.message);
    return { ok: false, message: "Could not set", status: 500 };
  }
}
export async function deleteFavorite(id) {
  const user = await getUser();
  if (!user) return { ok: false, message: "Not auth", status: 403 };

  if (!id || typeof id !== "string") {
    return { ok: false, message: "Id mismatch", status: 404 };
  }

  let favorite = [...(user.favorite || [])];
  favorite = favorite.filter((each) => each !== id);

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        favorite,
      },
    });
    return { ok: true, message: "Deleted", status: 200 };
  } catch (error) {
    console.log(error.message);
    return { ok: false, message: "Could not delete", status: 500 };
  }
}

export async function getFavorites() {
  const user = await getUser();
  if (!user) return { ok: false, message: "Not auth", status: 403 };

  try {
    const favoriteListings = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(user.favorite || [])],
        },
      },
    });
  
    return { ok: true, data: favoriteListings, status: 200 };
  } catch (error) {
    console.log(error.message);
    return { ok: false, message: error.message, status: 500 };
  }
}
