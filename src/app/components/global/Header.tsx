import Link from "next/link"
import Button from "./Button"
import { FC } from "react"
import { LogoutButton } from "../auth/LogoutButton"

interface HeaderProps {
    userId: string
}

const HeaderForm = () => {
    return(
        <header className="mx-auto mt-5 mb-5 flex items-center justify-between container p-5 rounded-md bg-neutral-50">
            <p>DevLinks</p>
            <nav>

            </nav>
            <Button label={"preview"} link={`/`} style={'secondary'} />
        </header>
    )
}

export const HeaderPreview:FC<HeaderProps> = ({userId}) => {
    return(
        <header className="mx-auto mt-5 mb-5 flex items-center justify-between container p-5 rounded-md bg-neutral-50">
            <Button label={"Back to editor"} link={`/form/${userId}`} style={'primary'} />
            <LogoutButton></LogoutButton>
            <Button label={"Share Link"} link={`/preview/${userId}`} style={'secondary'} />
        </header>
    )
}

export default HeaderForm