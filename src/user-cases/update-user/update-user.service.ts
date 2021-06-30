import User, { IUser, IUserUpdateParams } from "@/domain/entities/user.entity";
import UpdateUserRepository from "./update-user.repository";

class UpdateUserService {
  async updateUser (user: IUser, updateUserParams: IUserUpdateParams): Promise<IUser> {
    const updatedUserInfo = (await User(user).updateUser(updateUserParams)).toObject()
  
    return await UpdateUserRepository.updateUser(updatedUserInfo)
  }
}

export default new UpdateUserService()