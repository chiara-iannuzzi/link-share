import Link from "next/link"
import { FC } from "react"

interface ButtonProps {
    label: string,
    style: string,
    link?: string | null,
    className?: string,
    clickHandle?: () => {}
}

const Button:FC<ButtonProps> = ({label, style, link = null, clickHandle, className}) => {
    const styleButton:any = {
        primary : 'transition-all duration-200 bg-blue-500 hover:bg-electric-violet-500 text-white font-bold py-2 px-4 border border-electric-violet-500 rounded',
        secondary: 'transition-all duration-200 bg-transparent hover:bg-electric-violet-500 text-electric-violet-700 font-semibold hover:text-neutral-50 py-2 px-4 border border-electric-violet-500 hover:border-transparent rounded'
    }
    return(
        <>
            {link 
                ? 
                <Link href={link} className={`${styleButton[style]} ${className}`}>
                    {label}
                </Link>
                : 
                <button onClick={clickHandle} className={`${styleButton[style]} ${className}`}>
                    {label}
                </button>
            }
        </>
    )
}

export default Button