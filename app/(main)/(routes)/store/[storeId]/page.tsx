interface StoreProps {
  params: {
    storeId: string;
  };
}

const Store = async ({ params }: StoreProps) => {
    console.log(params);
    const storeId = params.storeId;
    


    return <div>{storeId}</div>;
};

export default Store;
