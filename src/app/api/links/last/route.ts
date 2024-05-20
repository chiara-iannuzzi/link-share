import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const latestQuery = await prisma.links.findMany({
            orderBy: {
                id: 'desc',
            },
            take: 1,
        })
        return NextResponse.json(latestQuery, {status: 200})
    }
    catch{
        return NextResponse.json({ message: 'could not fetch' }, {status: 500})
    }
}