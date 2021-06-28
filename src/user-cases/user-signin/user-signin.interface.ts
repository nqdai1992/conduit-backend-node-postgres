export interface IUserSignInRequestDTO {
    email: string,
    password: string,
}

export interface IUserSignInRequestBody {
    user: {
        email: string,
        password: string
    }
}