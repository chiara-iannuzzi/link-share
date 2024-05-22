export type FormInputPost = {
    socialNetworkId: string,
    link: string,
}

export type FormInputPostWithId = {
    socialNetworkId: string,
    link: string,
    id?: number
}

export type FormInputCollectionPost = {
    test: FormInputPostWithId[]
}

export type scProps = {
    id: string,
    name: string
}