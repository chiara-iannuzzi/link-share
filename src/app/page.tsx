import { LoginButton } from "@/app/components/auth/LoginButton";
import { User } from "@/app/components/auth/User";
import { getAuthSession } from "@/lib/auth";
import { HeaderPreview } from "@/app/components/global/Header";
import Card from "@/app/components/preview/Card";
import { scProps } from "@/app/types";
import prisma from "@/lib/prisma";
import { FC } from "react"
import { LogoutButton } from "./components/auth/LogoutButton";

export default async function Home() {
  const session = await getAuthSession()
  
  if (session){
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
  
    const userId = session?.user.id;
  
      const user = await getUser(userId);
    return (
      <div className="h-screen">
          <HeaderPreview userId={userId}></HeaderPreview>
          <section className="flex max-h-screen h-full w-full items-center justify-center">
              <Card user={user} />
          </section>
      </div>
  )
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <LoginButton></LoginButton>
      </div>
    </main>
  );
}