import GenericHeader from "@/components/Headers/generic-header";
import TableGeneric from "@/components/tables/table-generic";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { Size } from "@prisma/client";

const SizePage = async ({ params }: { params: { storeId: string } }) => {
  const arrSizes = await db.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const store = await db.store.findUnique({
    where: { id: params.storeId },
  });

  if (!store) return null;

  const root = `/store/${params.storeId}/sizes`;

  const columns = [
    {
      name: "Name",
      style: "font-medium",
    },
    {
      name: "Value",
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
        title={`Sizes (${arrSizes?.length})`}
        description="In this section you can manage your sizes"
        routeAddNew={`/store/${store.id}/sizes/new`}
      />
      <div className="mx-4 my-2 flex justify-between">
        <Separator />
      </div>
      <TableGeneric<Size>
        sourceProperties={properties}
        title="List of your recent sizes"
        arrSource={arrSizes}
        tableType="Size"
        arrTableHeader={columns}
        root={root}
        sourceModal="size"
        store={store}
      />
    </>
  );
};

export default SizePage;
