import { getCurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const profile = await getCurrentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { storeId } = params;

    if (!storeId) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const store = await db.store.delete({
      where: {
        id: storeId,
        userId: profile.id,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const profile = await getCurrentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { storeId } = params;

    if (!storeId) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const store = await db.store.findUnique({
      where: {
        id: storeId,
        userId: profile.id,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_ID_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const profile = await getCurrentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { storeId } = params;

    const {
      name,
      backgroundImageUrl,
      logoImageUrl,
      description,
      address,
      fbLink,
      igLink,
      xLink,
      tiktokLink,
      emailSupport,
      phoneSupport,
      showWhatsapp,
    } = await req.json();

    if (!storeId) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const store = await db.store.update({
      where: {
        id: storeId,
        userId: profile.id,
      },
      data: {
        name: name,
        backgroundImageUrl: backgroundImageUrl,
        logoImageUrl: logoImageUrl,
        description: description,
        address: address,
        fbLink: fbLink,
        igLink: igLink,
        xLink: xLink,
        tiktokLink: tiktokLink,
        emailSupport: emailSupport,
        phoneSupport: phoneSupport,
        showWhatsapp: showWhatsapp,

      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
