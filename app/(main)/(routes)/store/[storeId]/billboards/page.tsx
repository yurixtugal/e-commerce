import BillBoardHeader from "@/components/Headers/billBoard-header";
import TableBillBoard from "@/components/tables/table-billboard";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { BillBoard } from "@prisma/client";

const BillBoard = async ({ params }: { params: { storeId: string } }) => {
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
      <BillBoardHeader arrBillBoard={arrBillBoard} />
      <div className="mx-4 my-2 flex justify-between">
        <Separator />
      </div>
      <TableBillBoard<BillBoard>
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

export default BillBoard;
