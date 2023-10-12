import { getCurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { productId, storeId } = params;

    if (!storeId || !productId) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const store = await db.store.findUnique({
      where: {
        id: storeId
      },
    });

    if (!store) return new NextResponse("Not Found", { status: 404 });

    const product = await db.product.findUnique({
      where: {
        id: productId,
        storeId: storeId,
      },
      include: {
        variants: {
          include:{
            Color: true, 
            Size: true
          }
        },
        images: true,
        Category: true,
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[BILLBOARD_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}