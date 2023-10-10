import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const storeId = params.storeId;

    if (!storeId) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const store = await db.category.findMany({
      where: {
        billBoard: {
          storeId,
        },
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_ID_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
