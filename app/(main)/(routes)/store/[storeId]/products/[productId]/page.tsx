import GenericFormHeader from "@/components/Headers/generic-form-header";
import ColorForm from "@/components/forms/color-forms";
import ProductForm from "@/components/forms/product-forms";

import { Separator } from "@/components/ui/separator";
import { getCurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { Category, Color, Product, Size } from "@prisma/client";

const ColorPage = async ({
  params,
}: {
  params: { storeId: string; productId: string };
}) => {
  let title = "";
  let description = "";
  let labelButton = "";

  const profile = await getCurrentProfile();

  if (!profile) return redirectToSignIn();

  let store = await db.store.findUnique({
    where: { id: params.storeId, userId: profile.id },
  });

  if (!store) return null;
  const product = await db.product.findUnique({
    where: {
      id: params.productId,
      storeId: params.storeId,
      Store: {
        userId: profile.id,
      },
    },
  });
  if (!product) {
    title = "Create product";
    description = "Add a new product";
    labelButton = "Create";
  } else {
    title = "Edit product";
    description = "Edit your product";
    labelButton = "Save changes";
  }

  const arrCategories = await db.category.findMany({
    where: {
      billBoard:{
        storeId: params.storeId
      }
    },
  });

  return (
    <>
      <div className="mx-4 my-4 flex justify-between">
        <GenericFormHeader<Product>
          title={title}
          description={description}
          source={product}
          store={store}
          sourceType="product"
          modalType="deleteProduct"
        />
      </div>
      <div className="mx-4 my-2 flex justify-between">
        <Separator />
      </div>
      <div className="mx-4 my-2 flex justify-between">
        <ProductForm
          labelButton={labelButton}
          storeId={params.storeId}
          product={product}
          arrCategories = {arrCategories}
        />
      </div>
    </>
  );
};

export default ColorPage;
