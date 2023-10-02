import { db } from "@/lib/db";

interface StoreProps {
  params: {
    storeId: string;
  };
}

const Store = async ({ params }: StoreProps) => {

    const storeId = params.storeId;
    
    const store = await db.store.findUnique({where: {id: storeId}});

    if (!store) return <div>Store not found</div>

    return <div>Overview</div>;
};

export default Store;
