export interface UserPersitence {
    username: string,
    email: string
}

export default interface SignUpPersistenceOutputPort {
    findUser(username: string, email: string): Promise<UserPersitence | null>,
    saveUser(username: string, email: string, password: string): Promise<UserPersitence>
}