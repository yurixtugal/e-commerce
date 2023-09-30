import InitialModal from "@/components/modals/initial-modal";
import { db } from "@/lib/db";
import initialProfile from "@/lib/initial-profile";
import { redirect } from "next/navigation";

export default async function setUp() {
  
  console.log("Inicio")

  const user = await initialProfile();

  console.log(user);

  const store = await db.store.findFirst({
    where: {
      userId: user.id,
    },
  });


  if (!store) return <InitialModal />
  else redirect(`/store/${store.id}`)

 
}
