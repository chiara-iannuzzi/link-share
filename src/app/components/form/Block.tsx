import { FC, useRef, useState } from "react"

interface SCListProps {
    id: string,
    name: string,
}

interface BlockProps {
    SCList : SCListProps[],
    selectProps: any,
    inputProps: any,
    idProps: any,
    removeOnClick: () => {}
}

const Block:FC<BlockProps> = ({SCList, selectProps, inputProps, idProps, removeOnClick}) => {

    const [id, setId] = useState(null)

    
    return (
        <div>
            <h2>Link 1</h2>
            {SCList.length > 1 && 
                <>
                    <p></p>
                    <input className="hidden" {...idProps}></input>
                    <label htmlFor="social">Réseau</label>
                    <select {...selectProps}>
                        {SCList.map((item) => 
                            <option value={item.id} key={item.id}>{item.name}</option>
                        )}
                    </select>
                    <button type="button" onClick={removeOnClick}>
                        Delete
                    </button>
                </>
            }
           
            <label htmlFor="social">link</label>
            <input {...inputProps} type="text" id="link" />
        </div>
    )
}

export default Block