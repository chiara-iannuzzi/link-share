import { FormInputPost, FormInputPostWithId, scProps } from "@/app/types";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import axios from "axios";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { SubmitHandler } from "react-hook-form";
import Form from "../../components/form/Form";
import { getAuthSession } from "@/lib/auth";
import { User } from "../../components/auth/User";
import prisma from "@/lib/prisma";
import HeaderForm from "@/app/components/global/Header";

interface EditPageProps {
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

const BlogUpdate:FC<EditPageProps> = async({params}) => {

  const {userId} = params

    const session = await getAuthSession()

    const user = await getUser(userId);
    const sc:scProps[] = await getSocialNetwork()

    let defaultValue:FormInputPostWithId[] = []

    user?.links.forEach((item) => {
      defaultValue.push({"link": item.link ?? '', "socialNetworkId": item.socialNetworkId, "id": item.id})
    })

  
    if (session){
        return (
          <>
            <HeaderForm></HeaderForm>
            <main className="flex container gap-5 mx-auto">
                <div className="w-1/2 bg-neutral-100 mt-5 flex justify-center items-center">
                  <img src={'/phone.png'} className="w-3/4" />
                </div>
                <Form userId={userId} initialValue={defaultValue}/>
            </main>
          </>
        )
    }

  return (
    <p>Vous n'avez pas le droit !</p>
  );
}

export default BlogUpdate