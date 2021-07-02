import { IProfileResponse } from "@/dtos/profile.response.dto"
import APIError from "@/errorHandler/APIError"
import HttpStatusCode from "@/errorHandler/HttpStatusCode"
import GetProfileRespository from "../get-profile/get-profile.respository"
import FollowUserRepository from "./follow-user.repository"

class FollowUserService {
  async followUser (followerId: number,  usernameTarget: string): Promise<IProfileResponse> {
    try {
      const target = await this.getUserByUsername(usernameTarget)
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

export default new FollowUserService()