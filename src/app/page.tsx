import { LoginButton } from "@/app/components/auth/LoginButton";
import { User } from "@/app/components/auth/User";
import { getAuthSession } from "@/lib/auth";

export default async function Home() {
  const session = await getAuthSession()
  
  if (session){
    return <User></User>
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <LoginButton></LoginButton>
        
      </div>
    </main>
  );
}
