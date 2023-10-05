import GenericHeader from "@/components/Headers/generic-header";
import TableGeneric from "@/components/tables/table-generic";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { Color, Size } from "@prisma/client";

const ColorPage = async ({ params }: { params: { storeId: string } }) => {
  const arrColors = await db.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const store = await db.store.findUnique({
    where: { id: params.storeId },
  });

  if (!store) return null;

  const root = `/store/${params.storeId}/colors`;

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
        title={`Colors (${arrColors?.length})`}
        description="In this section you can manage your colors"
        routeAddNew={`/store/${store.id}/colors/new`}
      />
      <div className="mx-4 my-2 flex justify-between">
        <Separator />
      </div>
      <TableGeneric<Color>
        sourceProperties={properties}
        title="List of your recent colors"
        arrSource={arrColors}
        tableType="Color"
        arrTableHeader={columns}
        root={root}
        sourceModal="color"
        store={store}
      />
    </>
  );
};

export default ColorPage;
