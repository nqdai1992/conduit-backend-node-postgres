import User from "@/entities/user/User";

export interface UserPersitence {
    username: string,
    email: string
}

export default interface SignUpPersistenceOutputPort {
    findUser(username: string, email: string): Promise<UserPersitence | null>,
    saveUser(user: User): Promise<UserPersitence>
}