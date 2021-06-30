export interface IUpdateUserRequestDTO {
    email?: string,
    bio?: string,
    image?: string,
    password?: string,
    username?: string
}

export interface IUpdateUserRequestBody {
    user:IUpdateUserRequestDTO
}