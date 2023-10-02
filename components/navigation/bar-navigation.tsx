import { UserButton } from "@clerk/nextjs";
import MainBar from "./main-navigation";
import ComboStore from "./combo-store";
import { db } from "@/lib/db";

const BarNav = async () => {

  const arrStore = await db.store.findMany( {select: {id: true, name: true}, orderBy: {name: "asc"}});

  return (
    <div className="border-b">
      <div className="flex items-center px-4 h-16">
        <ComboStore arrStore={arrStore} />
        <MainBar />
        <div className="flex items-center ml-auto space-x-4">
            <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default BarNav;
