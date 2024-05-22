import { scProps } from "@/app/types";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { FC } from "react";
import BigButtons from "../global/BigButton";
import Image from "next/image";

interface CardProps {
    user:any
}

const getSocialNetwork = async() => {
    const response = await prisma.socialNetwork.findMany();
    return response;
}

const Card:FC<CardProps> = async({user}) => {

    const sc:scProps[] = await getSocialNetwork()

    const getSCFromLink = (scId:string) => {
        const linkSc:scProps | undefined = sc.find((item:any) => item.id == scId)
        return linkSc ? linkSc.name : ''
    }

    return (
        <div className="w-96 shadow-xl bg-neutral-50 p-4 rounded-lg">
            <div className="mb-10 text-center flex flex-col items-center justify-center">
                <Image className="mb-4" width={100} height={100} alt={user?.name} src={user?.image ?? ""} />
                <p className="text-lg">{user?.name}</p>
                <p className="text-sm text-neutral-600">{user?.email}</p>
            </div>

            {user?.links.length > 0 
            ?
                user?.links.map((item:any) =>
                    <BigButtons 
                        label={getSCFromLink(item.socialNetworkId)} 
                        icon={getSCFromLink(item.socialNetworkId).toLowerCase()} 
                        link={item.link ?? ''} 
                        key={item.id} />
                )
            : <p className="text-center mb-4 text-neutral-600 text-sm">No links yet</p>
            }
        </div>
    )
}

export default Card;