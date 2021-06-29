import User, { IUser } from "@/domain/entities/user.entity";
import APIError from "@/errorHandler/APIError";
import HttpStatusCode from "@/errorHandler/HttpStatusCode";
import { compare } from "@/utils/password";
import userSigninRepository from "./user-signin.repository";

class UserSignInService {
  async signIn (email: string, password: string): Promise<IUser> {
    const userResponse = await userSigninRepository.fetchUser(email);
    
    if (!userResponse) {
      throw new APIError(
        'USER NOT FOUND',
        HttpStatusCode.BAD_REQUEST,
        true,
        'user is not found'
      )
    }

    const isMatchPassword = await compare(password, userResponse.password)


    if (!isMatchPassword) {
      throw new APIError(
        'USER NOT FOUND',
        HttpStatusCode.BAD_REQUEST,
        true,
        'username or password is incorrect'
      )
    }

    return User(userResponse).generateToken().toObject()
  }
}


export default new UserSignInService();

