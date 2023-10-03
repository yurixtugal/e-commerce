import BillBoardHeader from "@/components/Headers/billBoard-header";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";


const BillBoard = async ({params}:{params: { storeId: string }}) => {
  
  const arrBillBoard = await db.billBoard.findMany({where: {
    storeId: params.storeId
  }});


  return (
  <>
    <BillBoardHeader arrBillBoard={arrBillBoard}/>
    <div className="mx-4 my-2 flex justify-between">
        <Separator />
      </div>
  </>);
};

export default BillBoard;
