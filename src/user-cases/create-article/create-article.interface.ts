export interface ICreateArticleRequest {
    title: string,
    description: string,
    body: string,
    tagList?: string[]
}

export interface ICreateArticleRequestBody {
    article: ICreateArticleRequest
}

export interface ICreateArticleParmas {
    title: string,
    body: string,
    description: string,
    slug: string,
    authorId: number
}

