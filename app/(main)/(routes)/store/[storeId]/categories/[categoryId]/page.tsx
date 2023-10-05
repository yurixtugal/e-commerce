import GenericFormHeader from "@/components/Headers/generic-form-header";
import CategoryForm from "@/components/forms/category-forms";
import { Separator } from "@/components/ui/separator";
import { getCurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { Category } from "@prisma/client";

const CategoryPage = async ({
  params,
}: {
  params: { storeId: string; categoryId: string };
}) => {
  let title = "";
  let description = "";
  let labelButton = "";

  const profile = await getCurrentProfile();

  if (!profile) return redirectToSignIn();

  let store = await db.store.findUnique({
    where: { id: params.storeId, userId: profile.id },
  });

  let category = await db.category.findUnique({
    where: {
      id: params.categoryId,
      billBoard: {
        store: {
          userId: profile.id,
        },
      },
    },
  });

  let arrBillBoards = await db.billBoard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  if (!store) return null;

  if (!category) {
    title = "Create category";
    description = "Add a new category";
    labelButton = "Create";
  } else {
    title = "Edit category";
    description = "Edit your category";
    labelButton = "Save changes";
  }

  return (
    <>
      <div className="mx-4 my-4 flex justify-between">
        <GenericFormHeader<Category>
          title={title}
          description={description}
          source={category}
          store={store}
          sourceType="category"
          modalType="deleteBillBoard"
        />
      </div>
      <div className="mx-4 my-2 flex justify-between">
        <Separator />
      </div>
      <div className="mx-4 my-2 flex justify-between">
        <CategoryForm
          labelButton={labelButton}
          storeId={params.storeId}
          arrBillBoards={arrBillBoards}
          category={category}
        />
      </div>
    </>
  );
};

export default CategoryPage;
