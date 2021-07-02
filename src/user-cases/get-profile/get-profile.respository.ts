import { IUser } from '@/domain/entities/user.entity'
import db from '@/infastructure/database'

class GetProfileRepository {
  async findFollowing (followerId: number, targetId: number) {
    try {
      const { rows } = await db.query(`SELECT * FROM following WHERE follower_id=$1 AND target_id=$2`, [followerId, targetId])
      return rows[0]
    } catch (err) {
      throw new Error(err.message)
    }
  }
  async findUserByUserName (username: string): Promise<IUser> {
    try {
      const { rows } = await db.query(`SELECT * FROM users WHERE username=$1`, [username])
      return rows[0]
    } catch (err) {
      throw new Error(err.message)
    }
    
  }
}

export default new GetProfileRepository()