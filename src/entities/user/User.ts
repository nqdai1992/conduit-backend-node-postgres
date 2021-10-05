import { v4 as uuidv4 } from 'uuid'

export interface IUser {
    getUsername: () => string;
    getId: () => string;
    getEmail: () => string;
    follow: (user: IUser) => IUser;
    unfollow: (user: IUser) => IUser;
    getFollowsUserIds: () => string[];
    toObject: () => { id: string, username: string, email: string }
}

const User = (id: string, username: string, email: string, followedUserIds = []): IUser => { 
    return {
        getUsername: () => username,
        getId: () => id,
        getEmail: () => email,
        follow: (user: IUser) => {
            if (user.getId() === id) return user
            
            const newFollowedUsers = Array.from(new Set([...followedUserIds, user.getId()]))
            
            return User(id, username, email, newFollowedUsers)
        },
        unfollow: (user: IUser) => {
            const newFollowedUsers = followedUserIds.filter(id => id !== user.getId())
            
            return User(id, username, email, newFollowedUsers)
        },
        getFollowsUserIds: () => followedUserIds,
        toObject: () => ({id, username, email})
    }
}

export const createUserWithoutId = (username: string, email: string): IUser => {
    return User(uuidv4(), username, email)
}

export const createUserWithId = (id: string, username: string, email: string): IUser => {
    return User(id, username, email)
}

export default User;