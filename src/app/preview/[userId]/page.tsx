import { HeaderPreview } from "@/app/components/global/Header";
import Card from "@/app/components/preview/Card";
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
        email: true,
        image: true,
        links: true
      }
    });
    return response;
}

const Preview:FC<PreviewPageProps> = async({params}) => {
    const {userId} = params;

    const user = await getUser(userId);


    if(user != null){
        return (
            <div className="h-screen">
                <section className="flex max-h-screen h-full w-full items-center justify-center">
                    <Card user={user} />
                </section>
            </div>
        )
    }

    return (
        <p>Pas d'utilisateur trouvé</p>
    )
}

export default Preview