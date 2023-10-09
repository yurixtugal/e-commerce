import { getCurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const profile = await getCurrentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { productId, storeId } = params;

    if (!storeId || !productId) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const store = await db.store.findUnique({
      where: {
        id: storeId,
        userId: profile.id,
      },
    });

    if (!store) return new NextResponse("Not Found", { status: 404 });

    const productVariant = await db.variantProduct.deleteMany({
      where: {
        productId: productId,
      },
    });

    const productImage = await db.imagesProduct.deleteMany({
      where: {
        productId: productId,
      },
    });

    const product = await db.product.delete({
      where: {
        id: productId,
        storeId: storeId,
        Store: {
          userId: profile.id,
        },
      },
      include: {
        variants: true,
        images: true,
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[BILLBOARD_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const profile = await getCurrentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { storeId, productId } = params;

    const valuesProduct = await req.json();
    
    const {
      name,
      categoryId,
      imagesUrl,
      variants,
      isVariant,
      basePrice,
      quantity,
    } = valuesProduct;

    if (!storeId || !productId) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    const store = await db.store.findUnique({
      where: {
        id: storeId,
        userId: profile.id,
      },
    });

    if (!store) return new NextResponse("Not Found", { status: 404 });

    const product = await db.product.update({
      where: {
        id: productId,
        storeId: storeId,
        Store: {
          userId: profile.id,
        },
      },
      data: {
        name: name,
        categoryId: categoryId,
        storeId: storeId,
        basePrice: basePrice,
        isVariant: isVariant,
        images: {
          createMany: {
            data: imagesUrl,
          },
        },
        variants: {
          createMany: {
            data: variants,
          },
        },
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[BILLBOARD_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
