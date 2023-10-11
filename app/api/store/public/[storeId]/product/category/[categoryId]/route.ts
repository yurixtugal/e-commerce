import { getCurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { categoryId, storeId } = params;
    console.log("categoryId", categoryId,storeId);
    if (!storeId || !categoryId) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const store = await db.store.findUnique({
      where: {
        id: storeId
      },
    });

    if (!store) return new NextResponse("Not Found", { status: 404 });

    const arrProducts = await db.product.findMany({where: {
      storeId: storeId,
      categoryId: categoryId
    },
    include: {
      images: true,
      Category: true,
      variants: {
        include:{
          Color: true,
          Size: true,
        }
      }      
    }})
    console.log(arrProducts)
    return NextResponse.json(arrProducts);
  } catch (error) {
    console.log("[BILLBOARD_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
