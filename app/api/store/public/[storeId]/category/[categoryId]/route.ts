import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string, categoryId: string } }
) {
  try {
    const storeId = params.storeId;

    if (!storeId) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const category = await db.category.findUnique({
      where: {
        id: params.categoryId,
      }
    });
    console.log(category)
    return NextResponse.json(category);
  } catch (error) {
    console.log("[STORE_ID_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
