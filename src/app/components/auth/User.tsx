import { LogoutButton } from "./LogoutButton"
import { getAuthSession } from "@/lib/auth"

export const User = async () => {
    const session = await getAuthSession()
    if(!session?.user){
        return <p>No User found</p>
    }
    return(
        <div className="card card-compact w-96 shadow-xl bg-gray-800">
            <div className="avatar">
                <div className="w-24 rounded">
                    <img src={session?.user?.image ?? ""} />
                </div>
            </div>
            <div className="card-body">
                <h2 className="card-title">{session?.user?.name}</h2>
                <p>{session?.user?.email}</p>
                <p>{session?.user?.id}</p>
                <div className="card-actions justify-end">
                    <LogoutButton></LogoutButton>
                </div>
            </div>
        </div>
    )
}