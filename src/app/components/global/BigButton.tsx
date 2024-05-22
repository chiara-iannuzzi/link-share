import { COLOR } from "@/app/constants/color"
import { FC } from "react"
import LazySvg from "./LazyIcon"

interface BigButtonsProps {
    link: string,
    label: string,
    icon: string
}

const BigButtons:FC<BigButtonsProps> = ({link, label, icon}) => {
    return(
        <a target="_blank" className="flex mb-5 items-center gap-4 w-full h-10 rounded-md text-neutral-50" style={{ backgroundColor: COLOR[icon] ?? '#fff' }} href={link ?? ''}>
            <LazySvg className="ml-2" fill="white" name={icon} />
            <p>{label}</p>
        </a>
    )
}

export default BigButtons