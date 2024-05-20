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
            <main className="">
                <h1 className='text-2xl my-4 font-bold'>Edit post</h1>
                <p>{user?.name}</p>
                <Form userId={userId} initialValue={defaultValue}/>
                <p>{userId}</p>
            </main>
        )
    }

  return (
    <p>Vous n'avez pas le droit !</p>
  );
}

export default BlogUpdate