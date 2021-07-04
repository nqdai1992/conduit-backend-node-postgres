export interface IArticlePersitence {
    id: number,
    author_id: number,
    title: string,
    slug: string,
    description: string,
    body: string,
    created_at: Date,
    udpate_at: Date
}