import { getCurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { name, value, order } = await req.json();
    const { storeId } = params;
    const profile = await getCurrentProfile();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const store = await db.store.findUnique({
      where: {
        id: storeId,
        userId: profile.id,
      },
    });

    if (!store) return new NextResponse("Unauthorized", { status: 401 });

    const size = await db.size.create({
      data: {
        name: name,
        value: value,
        storeId: storeId,
        order: order,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[CATEGORY_POST]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
