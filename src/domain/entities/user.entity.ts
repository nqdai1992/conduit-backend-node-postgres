import { hash } from "@/utils/password";
import jwt from 'jsonwebtoken'

export interface IUser {
  email: string;
  password?: string;
  username: string;
  bio?: string;
  image?: string;
  token?: string;
}

export interface UserEntity {
  toObject: () => IUser;
  hashPassword: () => Promise<UserEntity>;
  updateUser: (updateUser: Omit<IUser, "password">) => UserEntity;
  generateToken: () => UserEntity;
}

const User = (initUser: IUser): UserEntity => ({
  toObject: () => initUser,
  hashPassword: async () => User({ ...initUser, password: await hash(initUser.password) }),
  updateUser: (updateUser: Omit<IUser, "password">) => User({ ...initUser, ...updateUser }),
  generateToken: () => {
    const payload = { username: initUser.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    return User({ ...initUser, token})
  }
})

export default User;