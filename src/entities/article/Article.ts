import {v4 as uuidv4} from 'uuid'
import TagList from '../tagList/TagList';
import User from "../user/User";

export default class Article {
    #id: string;
    #title: string;
    #content: string;
    #description: string;
    #author: User;
    #status: string;
    #tags: TagList;
    #createdAt: Date;
    #updateAt: Date;

    constructor (id: string, title: string, content: string, description: string, author: User, status: string, tags?: string[], createdAt?: string, updatedAt?: string) {
        this.#id = id
        this.#title = title
        this.#content = content || ''
        this.#description = description || ''
        this.#author = author
        this.#status = status
        this.#tags = new TagList(tags)
        this.#createdAt = createdAt ? new Date(createdAt) : null
        this.#updateAt = updatedAt ? new Date(updatedAt) : null
    }

    static createArticleWithoutId (title: string, content: string, description: string, author: User, status: string, tags?: string[]) {
        return new Article(uuidv4(), title, content, description, author, status, tags)
    }

    static createArticleWithId (id: string, title: string, content: string, description: string, author: User, status: string, tags?: string[], createdAt?: string, updatedAt?: string) {
        return new Article(id, title, content, description, author, status, tags, createdAt, updatedAt)
    }

    get id (): string {
        return this.#id
    }

    get title (): string {
        return this.#title
    }

    get content (): string {
        return this.#content
    }

    get description (): string {
        return this.#description
    }

    get author (): User {
        return this.#author
    }

    get status (): string {
        return this.#status
    }

    get tags (): TagList {
        return this.#tags
    }

    get createdAt (): Date {
        return this.#createdAt
    }

    get updatedAt (): Date {
        return this.#updateAt
    }
}