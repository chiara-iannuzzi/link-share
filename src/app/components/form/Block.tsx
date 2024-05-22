'use client'

import { FC, Suspense, useRef, useState } from "react"
import LazySvg from "../global/LazyIcon"

interface SCListProps {
    id: string,
    name: string,
}

interface BlockProps {
    SCList : SCListProps[],
    selectProps: any,
    inputProps: any,
    icon: string,
    idProps: any,
    index: number,
    removeOnClick: () => {}
}

const Block:FC<BlockProps> = ({SCList, selectProps, inputProps, idProps, removeOnClick, icon, index}) => {

    const [id, setId] = useState(null)

    const selectRef = useRef(null)
    
    return (
        <div className="bg-neutral-200 p-5 rounded-md w-full">
            <div className="flex justify-between">
                <h2>Link {index}</h2>
                <button type="button" onClick={removeOnClick}>
                    Delete
                </button>
            </div>
            {SCList.length > 1 && 
                <>
                    <input className="hidden" {...idProps}></input>
                    <div className="relative">
                        <label className="text-neutral-600 text-xs" htmlFor="social">Réseau</label>
                        <LazySvg className="absolute bottom-4 left-1" name={icon} /> 
                        <select ref={selectRef} className="w-full p-2 pl-10 mb-2 h-10 rounded-md bg-neutral-50" {...selectProps}>
                            {SCList.map((item:any) => 
                                <option value={item.id} key={item.id}>{item.name}</option>
                            )}
                        </select>
                    </div>
                </>
            }

            <div className="relative">
                <label className="text-neutral-600 text-xs" htmlFor="social">link</label>
                <LazySvg className="absolute bottom-2 left-1" name="create-link" /> 
                <input className="w-full p-2 pl-10 h-10 rounded-md bg-neutral-50" {...inputProps} type="text" id="link" />
            </div>
        </div>
    )
}

export default Block