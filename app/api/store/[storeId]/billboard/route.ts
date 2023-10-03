import { getCurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function POST(req: Request,{ params }: { params: { storeId: string } }) {
  try {
    const {name, imageUrl} = await req.json();
    const { storeId } = params;
    console.log(name,storeId)
    const profile = await getCurrentProfile();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const billBoard = await db.billBoard.create({
      data: {
        name: name,
        storeId: storeId,
        imageUrl: imageUrl
      }
    });

    return NextResponse.json(billBoard)

  } catch (error) {
    console.log("[BILLBOARD_POST]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
