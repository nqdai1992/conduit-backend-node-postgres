import { hash } from "@/utils/password";
import jwt from 'jsonwebtoken'

export interface IUser {
  id?: number,
  email: string;
  password?: string;
  username: string;
  bio?: string;
  image?: string;
  token?: string;
}

export interface IUserUpdateParams {
  email?: string;
  password?: string;
  username?: string;
  bio?: string;
  image?: string;
}

export interface UserEntity {
  toObject: () => IUser;
  hashPassword: () => Promise<UserEntity>;
  updateUser: (updateUser: IUserUpdateParams) => Promise<UserEntity>;
  generateToken: () => UserEntity;
}

const User = (initUser: IUser): UserEntity => ({
  toObject: () => initUser,
  hashPassword: async () => User({ ...initUser, password: await hash(initUser.password) }),
  updateUser: async (updateUser: IUserUpdateParams) => {
    const {email, username, password, image, bio} = updateUser
    const hashPassword = password ? await hash(password) : initUser.password
    
    return User({ 
      ...initUser, 
      image: image || initUser.image,  
      bio: bio || initUser.bio,
      username: username || initUser.username,
      password: hashPassword,
      email: email || initUser.email
    })
  },
  generateToken: () => {
    const payload = { id: initUser.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    
    return User({ ...initUser, token})
  }
})

export default User;