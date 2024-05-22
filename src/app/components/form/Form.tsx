"use client"

import { FormInputCollectionPost, FormInputPost, FormInputPostWithId, scProps } from "@/app/types"
import { FC, useEffect, useState } from "react"
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import Block from "./Block"
import { useRouter } from "next/navigation"
import Button from "../global/Button"

interface FormPostProps {
    initialValue?: FormInputPost[],
    userId: string
}

const Form: FC<FormPostProps> = ({initialValue, userId}) => {
    const [social, setSocial] = useState([{ name: '', id: '' }])
    const router = useRouter();

    //fetch Social Network
    const getSocial = async() => {
        try{
            const response = await fetch('/api/socialnetwork')
            const data = await response.json()
            return data
        }
        catch{
            console.log('error')
        }
    }

    const getSCFromLink = (scId:string) => {
        const linkSc:scProps | undefined = social.find((item) => item.id == scId)
        return linkSc ? linkSc.name : 'nope'
    }

    useEffect(() => {
        const SCData = getSocial()
        SCData.then((response) =>
            setSocial(response)
        )
    }, [])

    const { register, control, handleSubmit, reset, watch, getValues } = useForm<FormInputCollectionPost>({
        defaultValues: {
          test: initialValue
        }
      });
      const {
        fields,
        append,
        prepend,
        remove,
        swap,
        move,
        insert,
        replace
      } = useFieldArray({
        control,
        name: 'test',
      });

    const watchAllFields:any = watch('test');

    const submit = async(data:any) => {
        const values = data.test;

        values.forEach(async(item:any) => {
            const data = {
                link: item.link,
                socialNetworkId: item.socialNetworkId,
            }
            await fetch(`/api/links/${item.id}`, {
                method: "PUT",
                mode: "cors",
                cache: "no-cache", 
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
        })

        router.refresh();
    }


    return(
        <form onSubmit={(handleSubmit(submit))} className="overflow-y-auto max-h-screen p-5 bg-neutral-100 w-1/2 flex flex-col items-start justify-start gap-5 mt-5" action="">
            <div className="w-full">
                <h2 className="text-3xl mb-2 font-bold leading-tight">Customize your links</h2>
                <p className="text-sm text-neutral-500">Add/Edit/Remove links below and then share it with the world !</p>
                <Button 
                    className={"w-full mt-5"}
                    label={"Create new link"}
                    style="secondary"
                    clickHandle={
                    async() => {
                        const data = {
                            link:'',
                            socialNetworkId: "clw9ahc7z00066mxyispzidzy",
                            userId: userId
                        }
                        await fetch('/api/links/create', {
                            method: "POST",
                            mode: "cors",
                            cache: "no-cache", 
                            credentials: "same-origin",
                            headers: {
                            "Content-Type": "application/json",
                            },
                            body: JSON.stringify(data), // body data type must match "Content-Type" header
                        });

                        const dataLast = await fetch('/api/links/last');
                        const lastElement = await dataLast.json();

                        append({
                            link: data.link,
                            socialNetworkId: data.socialNetworkId,
                            id: lastElement[0].id
                        })

                    }
                
                }/>
            </div>
            {fields.map((item, index) => 
                <>
                    <Block 
                        index={index + 1}
                        selectProps={register(`test.${index}.socialNetworkId`, { required: true })}
                        inputProps={register(`test.${index}.link`, { required: true })}
                        idProps={register(`test.${index}.id`)}
                        icon={getSCFromLink(watchAllFields[index].socialNetworkId).toLowerCase()}
                        removeOnClick={async() => {
                            const values = getValues()
                            const id = values.test[index].id

                            await fetch(`/api/links/${id}`, {
                                method: "DELETE",
                                mode: "cors",
                                cache: "no-cache", 
                                credentials: "same-origin",
                                headers: {
                                "Content-Type": "application/json",
                                },
                            });
                            remove(index)
                        }}
                        SCList={social}
                    /> 
                </>
            )}

            <button type="submit" className="btn btn-primary w-full">Save</button>

        </form>
    )
}

export default Form