import GenericHeader from "@/components/Headers/generic-header";
import TableGeneric from "@/components/tables/table-generic";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { Category } from "@prisma/client";

const CategoryPage = async ({ params }: { params: { storeId: string } }) => {
  const arrCategories = await db.category.findMany({
    where: {
      billBoard: {
        storeId: params.storeId,
      },
    },
    include: {
      billBoard: true,
    },
  });

  const store = await db.store.findUnique({
    where: { id: params.storeId },
  });

  if (!store) return null;

  const root = `/store/${params.storeId}/categories`;

  const columns = [
    {
      name: "Name",
      style: "font-medium",
    },
    {
      name: "Billboard",
      style: "",
    },
    {
      name: "Date",
      style: "",
    },
  ];

  const properties = ["name", "billBoard", "updatedAt"];

  return (
    <>
      <GenericHeader
        title={`Categories (${arrCategories?.length})`}
        description="In this section you can manage your categories"
        routeAddNew={`/store/${store.id}/categories/new`}
      />
      <div className="mx-4 my-2 flex justify-between">
        <Separator />
      </div>
      <TableGeneric<Category>
        sourceProperties={properties}
        title="List of your recent categories"
        arrSource={arrCategories}
        tableType="Category"
        arrTableHeader={columns}
        root={root}
        sourceModal="category"
        store={store}
      />
    </>
  );
};

export default CategoryPage;
