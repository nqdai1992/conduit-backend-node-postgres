import { hash } from "@/utils/password";

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
}

const User = (initUser: IUser): UserEntity => ({
  toObject: () => initUser,
  hashPassword: async () => User({ ...initUser, password: await hash(initUser.password) }),
  updateUser: (updateUser: Omit<IUser, "password">) => User({ ...initUser, ...updateUser })
})

export default User;