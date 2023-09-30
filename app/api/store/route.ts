import { getCurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {name} = await req.json();
    const profile = await getCurrentProfile();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const store = await db.store.create({
      data: {
        name: name,
        userId: profile.id
      }
    });

    return NextResponse.json(store)

  } catch (error) {
    console.log("[STORE_POST]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
