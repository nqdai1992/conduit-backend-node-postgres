import { IUser } from "@/domain/entities/user.entity";
import APIError from "@/errorHandler/APIError";
import HttpStatusCode from "@/errorHandler/HttpStatusCode";
import { compare } from "@/utils/password";
import userSigninRepository from "./user-signin.repository";

class UserSignInService {
  async signIn (email: string, password: string): Promise<IUser> {
    const user = await userSigninRepository.fetchUser(email);
    
    if (!user) {
      throw new APIError(
        'USER NOT FOUND',
        HttpStatusCode.BAD_REQUEST,
        true,
        'username or password is incorrect'
      )
    }

    const isMatchPassword = await compare(password, user.password)

    if (!isMatchPassword) {
      throw new APIError(
        'USER NOT FOUND',
        HttpStatusCode.BAD_REQUEST,
        true,
        'username or password is incorrect'
      )
    }

    return user
  }
}


export default new UserSignInService();

