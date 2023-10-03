import SettingsHeader from "@/components/Headers/settings-header";
import SettingsForm from "@/components/forms/setting-forms";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { redirect, useParams } from "next/navigation";

const Setting = async ({params}:{params: { storeId: string }}) => {

  const storeId = params.storeId;
  const store = await db.store.findUnique({where: {id: storeId}});

  if (!store) return redirect("/")

  return (
    <>
      <SettingsHeader store={store} />
      <div className="mx-4 my-2 flex justify-between">
        <Separator />
      </div>
      <div className="mx-4 flex justify-between">
        <SettingsForm store={store} />
      </div>
    </>
  );
};

export default Setting;
