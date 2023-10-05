import { getCurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const profile = await getCurrentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { sizeId, storeId } = params;

    if (!storeId || !sizeId) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const store = await db.store.findUnique({
      where: {
        id: storeId,
        userId: profile.id,
      },
    });

    if (!store) return new NextResponse("Not Found", { status: 404 });

    const size = await db.size.delete({
      where: {
        id: sizeId,
        storeId: storeId,
        Store: {
          userId: profile.id,
        },
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[BILLBOARD_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) {
  try {
    const profile = await getCurrentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { storeId, sizeId } = params;

    const { name, value } = await req.json();

    if (!storeId || !sizeId) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const store = await db.store.findUnique({
      where: {
        id: storeId,
        userId: profile.id,
      },
    });

    if (!store) return new NextResponse("Not Found", { status: 404 });

    const size = await db.size.update({
      where: {
        id: sizeId,
        storeId: storeId,
        Store: {
          userId: profile.id,
        },
      },
      data: {
        name: name,
        value: value,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[BILLBOARD_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
