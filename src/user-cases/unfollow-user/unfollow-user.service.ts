import checkUserIsExistByUsername from "@/common/services/checkUserIsExistByUsername";
import { IProfileResponse } from "@/dtos/profile.response.dto";
import APIError from "@/errorHandler/APIError";
import HttpStatusCode from "@/errorHandler/HttpStatusCode";
import UnfollowUserRepository from "./unfollow-user.repository";

class UnfollowService {
  async unfollowUser (followerId: number,  usernameTarget: string): Promise<IProfileResponse> {
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

      return await UnfollowUserRepository.removeFollowing(followerId, target.id)

    } catch (err) {
      throw new Error(err.message)
    }
  }
}

export default new UnfollowService()