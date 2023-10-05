import { getCurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const profile = await getCurrentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { categoryId, storeId } = params;

    if (!storeId || !categoryId) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const category = await db.category.delete({
      where: {
        id: categoryId,
        billBoard: {
          storeId: storeId,
          store: {
            userId: profile.id,
          },
        },
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[BILLBOARD_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const profile = await getCurrentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { storeId, categoryId } = params;

    const { name, billBoardId } = await req.json();

    if (!storeId || !categoryId) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const category = await db.category.update({
      where: {
        id: categoryId,
        billBoard: {
          storeId: storeId,
          store: {
            userId: profile.id,
          },
        },
      },
      data: {
        name: name,
        billBoardId: billBoardId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[BILLBOARD_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
