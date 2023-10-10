import { getCurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const valuesProduct = await req.json();
    
    const {
      name,
      categoryId,
      imagesUrl,
      variants,
      isVariant,
      basePrice,
      quantity,
      isFeatured,
    } = valuesProduct;
    const { storeId } = params;
    const profile = await getCurrentProfile();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const store = await db.store.findUnique({
      where: {
        id: storeId,
        userId: profile.id,
      },
    });

    if (!store) return new NextResponse("Unauthorized", { status: 401 });

    const arrImages = (imagesUrl as []).map((url) => ({ imageUrl: url }));

    let currentVariant = [];

    if (isVariant) {
      currentVariant = variants;
    }else{
      currentVariant.push({
        price: basePrice,
        quantity: quantity})
    }

    console.log("[currentVariant]", currentVariant);

    const product = await db.product.create({
      data: {
        name: name,
        categoryId: categoryId,
        storeId: storeId,
        basePrice: basePrice,
        isVariant: isVariant,
        isFeatured: isFeatured,
        images: {
          createMany: {
            data: arrImages,
          },
        },
        variants: {
          createMany: {
            data: currentVariant,
          },
        },
      },
    });

    console.log("[Product]",product)

    return NextResponse.json(product);

    
  } catch (error) {
    console.log("[CATEGORY_POST]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
