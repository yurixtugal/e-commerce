import GenericFormHeader from "@/components/Headers/generic-form-header";
import CategoryForm from "@/components/forms/category-forms";
import SizeForm from "@/components/forms/size-forms";
import { Separator } from "@/components/ui/separator";
import { getCurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { Category, Size } from "@prisma/client";

const SizePage = async ({
  params,
}: {
  params: { storeId: string; sizeId: string };
}) => {
  let title = "";
  let description = "";
  let labelButton = "";

  const profile = await getCurrentProfile();

  if (!profile) return redirectToSignIn();

  let store = await db.store.findUnique({
    where: { id: params.storeId, userId: profile.id },
  });

  let size = await db.size.findUnique({
    where: {
      id: params.sizeId,
      storeId: params.storeId,
      Store: {
        userId: profile.id,
      },
    },
  });

  if (!store) return null;

  if (!size) {
    title = "Create size";
    description = "Add a new size";
    labelButton = "Create";
  } else {
    title = "Edit size";
    description = "Edit your size";
    labelButton = "Save changes";
  }

  return (
    <>
      <div className="mx-4 my-4 flex justify-between">
        <GenericFormHeader<Size>
          title={title}
          description={description}
          source={size}
          store={store}
          sourceType="size"
          modalType="deleteSize"
        />
      </div>
      <div className="mx-4 my-2 flex justify-between">
        <Separator />
      </div>
      <div className="mx-4 my-2 flex justify-between">
        <SizeForm
          labelButton={labelButton}
          storeId={params.storeId}
          size={size}
        />
      </div>
    </>
  );
};

export default SizePage;
