import checkUserIsExistByUsername from "@/common/services/checkUserIsExistByUsername"
import { IProfileResponse } from "@/dtos/profile.response.dto"
import APIError from "@/errorHandler/APIError"
import HttpStatusCode from "@/errorHandler/HttpStatusCode"
import FollowUserRepository from "./follow-user.repository"

class FollowUserService {
  async followUser (followerId: number,  usernameTarget: string): Promise<IProfileResponse> {
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
      const following = await FollowUserRepository.createFollowing(followerId, target.id)
            
      return {
        username: target.username,
        bio: target.username,
        image: target.image,
        following: !!following
      }
    } catch (err) {
      throw new Error(err.message)
    }
  } 
}

export default new FollowUserService()