import { v4 as uuidv4 } from 'uuid'
import User from "../user/User";

export default class Comment {
    #id: string;
    #content: string
    #author: User
    #articleId: string
    #parentId: string

    constructor (id: string, content: string, articleId: string, author: User, parentId?: string) {
        this.#id = id;
        this.#content = content;
        this.#articleId = articleId;
        this.#author = author;
        this.#parentId = parentId || null
    }

    static createCommentWithoutId (content: string, articleId: string, author: User, parentId?: string) {
        return new Comment(uuidv4(), content, articleId, author, parentId)
    }

    static createCommentWithId (id: string, content: string, articleId: string, author: User, parentId?: string) {
        return new Comment(id, content, articleId, author, parentId)
    }

    get id () {
        return this.#id
    }

    get content (): string {
        return this.#content
    }

    set content (newContent: string) {
        this.#content = newContent
    }

    get articleId (): string {
        return this.#articleId
    }

    get author (): User {
        return this.#author
    }

    get parentId (): string {
        return this.#parentId
    }
}