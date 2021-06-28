import User, { IUser } from "@/domain/entities/user.entity";
import APIError from "@/errorHandler/APIError";
import HttpStatusCode from "@/errorHandler/HttpStatusCode";
import { IUserSignUpRequestDTO } from "./user-signup.interface";
import UserSignupRepository from "./user-signup.repository";

class UserSignUpService {
  async createUser(userInfo: IUserSignUpRequestDTO): Promise<IUser> {
    const userIsExist = await UserSignupRepository.userIsExist(userInfo.username, userInfo.email)

    if (userIsExist) {
      throw new APIError(
        'CONFLICT',
        HttpStatusCode.CONFLICT,
        true,
        'user is already exist'
      )
    }
    
    const user = await User({
      email: userInfo.email,
      username: userInfo.username,
      password: userInfo.password
    }).hashPassword();

    const {email, password, username} = user.toObject()

    return await UserSignupRepository.createUser({email, password, username});
  }
}

export default new UserSignUpService();