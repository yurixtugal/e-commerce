import { UserButton } from "@clerk/nextjs";

const NavigationHeader = () => {
    return <div><UserButton afterSignOutUrl="/" appearance={
        {
            elements: {
                avatarBox: "w-[48px] h-[48px]"
            }

        }
    }  /></div>;
}
 
export default NavigationHeader;