import { IUser } from '@/domain/entities/user.entity'
import db from '@/infastructure/database'

export default async function findUserByUserName (username: string): Promise<IUser> {
  try {
    const { rows } = await db.query(`SELECT * FROM users WHERE username=$1`, [username])
    return rows[0]
  } catch (err) {
    throw new Error(err.message)
  }
}