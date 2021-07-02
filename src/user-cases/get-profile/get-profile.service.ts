import checkUserIsExistByUsername from "@/common/services/checkUserIsExistByUsername";
import { IProfileResponse } from "@/dtos/profile.response.dto";
import APIError from "@/errorHandler/APIError";
import HttpStatusCode from "@/errorHandler/HttpStatusCode";
import GetProfileRespository from "./get-profile.respository";

class GetProfileService {
  async getProfileRequireAuthen (followerId: number, usernameTarget: string): Promise<IProfileResponse> {
    try {
      const target = await checkUserIsExistByUsername(usernameTarget)

      if (!target) {
        throw new APIError(
          'BAD REQUEST',
          HttpStatusCode.NOT_FOUND,
          true,
          'user is not found'
        )
      }

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
      const target = await checkUserIsExistByUsername(usernameTarget)

      if (!target) {
        throw new APIError(
          'BAD REQUEST',
          HttpStatusCode.NOT_FOUND,
          true,
          'user is not found'
        )
      }

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
}

export default new GetProfileService()