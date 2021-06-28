export interface IUserSignUpRequestDTO {
    email: string,
    password: string,
    username: string
}

export interface IUserSignUpParams {
    email: string,
    password: string,
    username: string
}

export interface IUserSignUpRequestBody {
    user: {
        email: string,
        password: string,
        username: string
    }
}