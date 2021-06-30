export interface IUserSignInRequestDTO {
    email: string,
    password: string,
}

export interface IUserSignInRequestBody {
    user: IUserSignInRequestDTO
}