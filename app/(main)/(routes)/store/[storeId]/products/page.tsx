import GenericHeader from "@/components/Headers/generic-header";
import TableGeneric from "@/components/tables/table-generic";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { Color, Size } from "@prisma/client";

const ProductPage = async ({ params }: { params: { storeId: string } }) => {
  const arrProducts = await db.product.findMany({
    where: {
      storeId: params.storeId,
    }
  });

  const store = await db.store.findUnique({
    where: { id: params.storeId },
  });

  if (!store) return null;

  const root = `/store/${params.storeId}/products`;

  const columns = [
    {
      name: "Name",
      style: "font-medium",
    },
    {
      name: "Color",
      style: "",
    },
    {
      name: "Date",
      style: "",
    },
  ];

  const properties = ["name", "value", "updatedAt"];

  return (
    <>
      <GenericHeader
        title={`Products (${arrProducts?.length})`}
        description="In this section you can manage your products"
        routeAddNew={`/store/${store.id}/products/new`}
      />
      <div className="mx-4 my-2 flex justify-between">
        <Separator />
      </div>
      
    </>
  );
};

export default ProductPage;
