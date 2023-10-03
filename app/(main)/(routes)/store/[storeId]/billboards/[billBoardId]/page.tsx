import BillBoardFormHeader from "@/components/Headers/billBoard-form-header";
import BillBoardForm from "@/components/forms/billboard-forms";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { getCurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { Trash2Icon } from "lucide-react";

const BillBoardPage = async ({
  params,
}: {
  params: { storeId: string; billBoardId: string };
}) => {

  let title = "";
  let description = "";
  let labelButton = "";

  const profile = await getCurrentProfile();

  if (!profile) return redirectToSignIn();

  let store = await db.store.findUnique({
    where: { id: params.storeId, userId: profile.id },
  });

  let billBoard = await db.billBoard.findUnique({
    where: { id: params.billBoardId, 
      store: { 
        userId: profile.id
      } },
  });

  if (!billBoard) {
    title = "Create billboard";
    description = "Add a new billboard";
    labelButton = "Create";
  } else {
    title = "Edit billboard";
    description = "Edit your billboard";
    labelButton = "Save changes";
  }

  return (
    <>
      <div className="mx-4 my-4 flex justify-between">
        <BillBoardFormHeader title={title} description={description} billBoard={billBoard} store={store} />
      </div>
      <div className="mx-4 my-2 flex justify-between">
        <Separator />
      </div>
      <div className="mx-4 flex justify-between">

      <BillBoardForm labelButton={labelButton} billBoard={billBoard} storeId={params.storeId} />
      </div>

    </>
  );
};

export default BillBoardPage;
