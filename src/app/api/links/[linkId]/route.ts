import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface ContextProps {
    params: {
        linkId: string
    }
}

export async function DELETE(req: Request, context:ContextProps){
    try {
        const { params } = context
        await prisma.links.delete({
            where: {
                id: parseInt(params.linkId)
            }
        })
        return new Response(null, {status: 204})
    }
    catch(e){
        const { params } = context
        if (!params || !params.linkId) {
            return NextResponse.json({ message: 'Missing linkId parameter' }, { status: 400 });
        }
        if (typeof params.linkId !== 'number') {
            return NextResponse.json({ message: 'Invalid linkId parameter type' }, { status: 400 });
        }
        return NextResponse.json({ message: e }, {status: 500})
    }
}

export async function PUT(req: Request, context:ContextProps){
    try {
        const { params } = context
        const body = await req.json()
        await prisma.links.update({
            where: {
                id: parseInt(params.linkId)
            },
            data: {
                socialNetworkId: body.socialNetworkId,
                link: body.link
            }
        })
        return NextResponse.json({message: 'update success'}, {status: 200})
    }
    catch(error){
        return NextResponse.json({ message: error }, {status: 500})
    }
}

export async function GET(req: Request, context:ContextProps){
    try {
        const { params } = context
        const link = await prisma.links.findUnique({
            where: {
                id: parseInt(params.linkId)
            },
        });
        return NextResponse.json(link, {status: 200})
    }
    catch(e){
        return NextResponse.json({ message: e }, {status: 500})
    }
}   