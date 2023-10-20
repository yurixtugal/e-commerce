import { getCurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { categoryId, storeId } = params;
    const page = req.nextUrl.searchParams.get("page") || "0";
    const limit = req.nextUrl.searchParams.get("limit") || "10";
    console.log(page, limit);

    if (!storeId || !categoryId) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const store = await db.store.findUnique({
      where: {
        id: storeId,
      },
    });

    if (!store) return new NextResponse("Not Found", { status: 404 });

    const arrProducts = await db.product.findMany({
      where: {
        storeId: storeId,
        categoryId: categoryId,
      },
      include: {
        images: true,
        Category: true,
        variants: {
          include: {
            Color: true,
            Size: true,
          },
        },
      },
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
    });

    const total = await db.product.count({
      where: {
        storeId: storeId,
        categoryId: categoryId,
      },
    });

    const pagination = {
      currentPage: parseInt(page),
      total: total,
      lastPage: Math.ceil(total / parseInt(limit)),
    };

    return NextResponse.json({
      data: arrProducts,
      pagination,
    });
  } catch (error) {
    console.log("[BILLBOARD_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
