import { hash } from "keyhasher";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { name, email, password } = body;

  if (!name.trim() || !email.trim() || !password.trim()) {
    return NextResponse.json({ message: "Fields are empty!" }, { status: 400 });
  }

  const hashedPassword = hash(password);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(user, {
      status: 201,
    });
  } catch (error) {
    console.error(error.message);
    return NextResponse.json(
      {
        message:
          error.message || "Something went wrong while registering the user",
      },
      { status: 500 }
    );
  }
}
