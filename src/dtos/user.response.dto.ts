import { IUser } from "@/domain/entities/user.entity"

export interface IUserResponseDTO {
    user: Omit<IUser, "password">
}

const UserResponseDTO = (userEnity: IUser): IUserResponseDTO => {
  const { 
    email = null, 
    token = null, 
    username = null, 
    bio = null, 
    image = null
  } = userEnity

  return {
    user: {
      email, token, username, bio, image
    }
  }
}

export default UserResponseDTO