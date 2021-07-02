import { IProfileResponse } from "@/dtos/profile.response.dto";
import APIError from "@/errorHandler/APIError";
import HttpStatusCode from "@/errorHandler/HttpStatusCode";
import GetProfileRespository from "./get-profile.respository";

class GetProfileService {
  async getProfileRequireAuthen (followerId: number, usernameTarget: string): Promise<IProfileResponse> {
    try {
      const target = await this.getUserByUsername(usernameTarget)

      const followResult = await GetProfileRespository.findFollowing(followerId, target.id)

      return {
        username: target.username,
        bio: target.username,
        image: target.image,
        following: !!followResult
      }
    } catch (err) {
      throw new Error(err.message)
    }
  }
  async getProfileWithoutAuthen (usernameTarget: string): Promise<IProfileResponse> {
    try {
      const target = await this.getUserByUsername(usernameTarget)

      return {
        username: target.username,
        bio: target.username,
        image: target.image,
        following: false
      }
    } catch (err) {
      throw new Error(err.message)
    }
  }

  private async getUserByUsername (username) {
    try {
      const target = await GetProfileRespository.findUserByUserName(username)
            
      if (!target) {
        throw new APIError(
          'BAD REQUEST',
          HttpStatusCode.NOT_FOUND,
          true,
          'user is not found'
        )
      }

      return target
    } catch (err) {
      throw new Error(err.message)
    }
  }
}

export default new GetProfileService()