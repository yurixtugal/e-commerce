import BarNav from "@/components/navigation/bar-navigation";
import { getCurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const StoreIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) => {
    const profile = await getCurrentProfile();

    if (!profile) return redirectToSignIn();

    const storeId = params.storeId;

    const store = await db.store.findUnique({where: {id: storeId}});

    console.log("store: ",store)

    if (!store) {
        return redirect("/");
    } 

    return (
    <div className="h-full">
      <BarNav />
      <main>{children}</main>
    </div>
  );
};

export default StoreIdLayout;
