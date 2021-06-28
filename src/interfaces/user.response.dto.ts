import { IUser } from "@/domain/entities/user.entity"

export interface IUserResponseDTO {
    user: {
        email: string,
        token: string,
        username: string,
        bio: string,
        image: string,
      }  
}

const UserUserResponseDTO = (userEnity: IUser): IUserResponseDTO => {
  const { email, token, username, bio, image} = userEnity

  return {
    user: {
      email, token, username, bio, image
    }
  }
}

export default UserUserResponseDTO