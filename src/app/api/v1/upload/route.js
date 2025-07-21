import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");
  console.log(filename, "fff in backend");
  const blob = await put(filename, request.body, {
    access: "public",
    addRandomSuffix: true,
  });

  return NextResponse.json(blob);
}
