import GenericFormHeader from "@/components/Headers/generic-form-header";
import CategoryForm from "@/components/forms/category-forms";
import ColorForm from "@/components/forms/color-forms";
import SizeForm from "@/components/forms/size-forms";
import { Separator } from "@/components/ui/separator";
import { getCurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { Category, Color, Size } from "@prisma/client";

const ColorPage = async ({
  params,
}: {
  params: { storeId: string; colorId: string };
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
  console.log(store);
  const color = await db.color.findUnique({
    where: {
      id: params.colorId,
      storeId: params.storeId,
      Store: {
        userId: profile.id,
      },
    },
  });

  console.log(color);

  if (!store) return null;

  if (!color) {
    title = "Create color";
    description = "Add a new color";
    labelButton = "Create";
  } else {
    title = "Edit color";
    description = "Edit your color";
    labelButton = "Save changes";
  }

  return (
    <>
      <div className="mx-4 my-4 flex justify-between">
        <GenericFormHeader<Color>
          title={title}
          description={description}
          source={color}
          store={store}
          sourceType="color"
          modalType="deleteColor"
        />
      </div>
      <div className="mx-4 my-2 flex justify-between">
        <Separator />
      </div>
      <div className="mx-4 my-2 flex justify-between">
        <ColorForm
          labelButton={labelButton}
          storeId={params.storeId}
          color={color}
        />
      </div>
    </>
  );
};

export default ColorPage;
