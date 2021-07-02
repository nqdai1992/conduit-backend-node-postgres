import { IUser } from "@/domain/entities/user.entity";

export interface IProfileResponse {
    username: string,
    bio: string,
    image: string,
    following: boolean
}

export interface IProfileResponseDTO {
    profile: IProfileResponse
}

const ProfileResponseDTO = (profile: IProfileResponse): IProfileResponseDTO => {
  const { username = null, bio = null, image = null, following = false } = profile
  return {
    profile: {
      username, bio, image, following
    }
  }
}

export default ProfileResponseDTO