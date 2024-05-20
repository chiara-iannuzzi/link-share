import { scProps } from "@/app/types";
import prisma from "@/lib/prisma";
import { FC } from "react"

interface PreviewPageProps {
    params: {
      userId: string
    }
}

const getUser = async(id:string) => {
    const response = await prisma.user.findUnique({
      where: {
        id: id
      },
      select:{
        name: true,
        links: true
      }
    });
    return response;
}

const getSocialNetwork = async() => {
    const response = await prisma.socialNetwork.findMany();
    return response;
}

const Preview:FC<PreviewPageProps> = async({params}) => {
    const {userId} = params;

    const user = await getUser(userId);
    const sc:scProps[] = await getSocialNetwork()

    const getSCFromLink = (scId:string) => {
        const linkSc:scProps | undefined = sc.find((item) => item.id == scId)
        return linkSc ? linkSc.name : 'nope'
    }

    if(user != null){
        return (
            <>
                <p>Je suis une preview !!!!</p>
                <p>{user?.name}</p>
                {user?.links.map((item) =>
                    <a target="_blank" href={item.link ?? ''} key={item.id}>
                        <p>{getSCFromLink(item.socialNetworkId)}</p>
                    </a>
                )}
            </>
        )
    }

    return (
        <p>Pas d'utilisateur trouvé</p>
    )
}

export default Preview