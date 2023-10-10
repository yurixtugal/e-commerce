import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { storeId } = params;

    if (!storeId) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const store = await db.store.findUnique({
      where: {
        id: storeId,
      },
    });


    const arrProductsFeatured = await db.product.findMany({where: {
      storeId: storeId
    }})

    return NextResponse.json(arrProductsFeatured);
  } catch (error) {
    console.log("[STORE_ID_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
