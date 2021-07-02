import { IUser } from "@/domain/entities/user.entity"
import findUserByUserName from "../repositories/findUserByUsername.repository"

export default async function checkUserIsExistByUsername (username: string): Promise<IUser | undefined> {
  try {
    const target = await findUserByUserName(username)
    return target
  } catch (err) {
    throw new Error(err.message)
  }
}