import { getCurrentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, billBoardId: string } } 
) {
    try {
        const profile = await getCurrentProfile();

        if (!profile){
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const { billBoardId, storeId } = params

        if (!storeId || !billBoardId){
            return new NextResponse("Bad Request", { status: 400 })
        }

        const billBoard = await db.billBoard.delete({
            where: {
                id: billBoardId,
                storeId: storeId,
                store: {
                    userId: profile.id
                }
            }
        })

        return NextResponse.json(billBoard);

    } catch (error) {
        console.log("[BILLBOARD_ID_DELETE]",error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, billBoardId: string } }
) {
    try {
        const profile = await getCurrentProfile();

        if (!profile){
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const { storeId,billBoardId } = params
        console.log(storeId,billBoardId,"----")
        const {name, imageUrl} = await req.json()

        if (!storeId || !billBoardId){
            return new NextResponse("Bad Request", { status: 400 })
        }

        const billBoard = await db.billBoard.update({
            where: {
                id: billBoardId,
                storeId: storeId,
                store: {
                    userId: profile.id
                }

            },
            data: {
                name: name,
                imageUrl: imageUrl
            }    
        })

        return NextResponse.json(billBoard);

    } catch (error) {
        console.log("[BILLBOARD_ID_PATCH]",error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}