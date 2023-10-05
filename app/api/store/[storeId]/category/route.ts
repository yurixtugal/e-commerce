import { getCurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { name, billBoardId } = await req.json();
    const { storeId } = params;
    const profile = await getCurrentProfile();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const billBoard = await db.billBoard.findUnique({
      where: {
        id: billBoardId,
        store: {
          id: storeId,
          userId: profile.id,
        },
      },
    });

    if (!billBoard) return new NextResponse("Unauthorized", { status: 401 });

    const category = await db.category.create({
      data: {
        name: name,
        billBoardId: billBoardId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_POST]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
