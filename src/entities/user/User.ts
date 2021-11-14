import { compare, hash } from '@/helpers/password';
import { v4 as uuidv4 } from 'uuid'
export default class User {
    #id: string;
    #username: string;
    #email: string;
    #followedUserIds: string[];
    #password: string;
    constructor (id: string, username: string, email: string, password: string, followedUserIds?: string[]) {
        this.#id = id;
        this.#email = email
        this.#username = username
        this.#followedUserIds = followedUserIds || []
        this.#password = password
    }
    
    static createUserWithoutId = async (username: string, email: string, password: string): Promise<User> => {
        const hashedPassword = await hash(password);

        return new User(uuidv4(), username, email, hashedPassword)
    }

    static createUserWithId = (id: string, username: string, email: string, password: string): User => {
        return new User(id, username, email, password)
    }

    get id (): string {
        return this.#id
    }

    get username (): string {
        return this.#username
    }

    get email (): string {
        return this.#email
    }

    get followedUserIds (): string[] {
        return this.#followedUserIds
    }

    follow (user: User): User {
        if (this.#id === user.id) return this
        if (this.#followedUserIds.includes(user.id)) return this
    
        this.#followedUserIds.push(user.id)

        return this
    }

    unfollow (user: User): User {
        this.#followedUserIds = this.#followedUserIds.filter(id => id !== user.id)

        return this
    }

    async isAuthenticated (email: string, password: string): Promise<boolean> {
        const isMatchEmail = this.#email === email
        const isMatchPassword = await compare(password, this.#password)

        return isMatchEmail && isMatchPassword 
    } 
};