import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const links = await prisma.socialNetwork.findMany()
        return NextResponse.json(links, {status: 200})
    }
    catch{
        return NextResponse.json({ message: 'could not fetch' }, {status: 500})
    }
}