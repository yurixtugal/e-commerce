import GenericHeader from "@/components/Headers/generic-header";
import TableGeneric from "@/components/tables/table-generic";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { BillBoard } from "@prisma/client";

const BillBoardPage = async ({ params }: { params: { storeId: string } }) => {
  const arrBillBoard = await db.billBoard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const store = await db.store.findUnique({
    where: { id: params.storeId },
  });

  if (!store) return null;

  const root = `/store/${params.storeId}/billboards`

  const columns = [
    {
      name: "Name",
      style: "font-medium",
    },
    {
      name: "Image",
      style: "",
    },
    {
      name: "Date",
      style: "",
    },
  ];

  const properties = ["name", "imageUrl", "updatedAt"];

  return (
    <>
      <GenericHeader 
      title={`Billboards (${arrBillBoard?.length})`} 
      description="In this section you can manage your billboard"
      routeAddNew={`/store/${store.id}/billboards/new`}
      />
      <div className="mx-4 my-2 flex justify-between">
        <Separator />
      </div>
      <TableGeneric<BillBoard>
        sourceProperties={properties}
        title="List of your recent billboards"
        arrSource={arrBillBoard}
        tableType="BillBoard"
        arrTableHeader={columns}
        root={root}
        sourceModal="billBoard"
        store={store}
      />
    </>
  );
};

export default BillBoardPage;
