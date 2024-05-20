import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try {
        const body = await req.json();
        const post = await prisma.links.create({
            data: {
                link: body.link,
                socialNetworkId: body.socialNetworkId,
                userId: body.userId
            }
        })
        return NextResponse.json(post, {status: 200})
    }
    catch{
        return NextResponse.json({ message: 'could not post' }, {status: 500})
    }
}