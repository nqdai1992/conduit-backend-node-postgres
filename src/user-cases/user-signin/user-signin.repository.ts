import { IUser } from '@/domain/entities/user.entity'
import db from '@/infastructure/database'

class UserSignInRepository {
  async fetchUser (email: string): Promise<IUser> {
    try {
      const { rows } = await db.query('SELECT * FROM users WHERE email=$1', [email])
      return rows[0]
    } catch (err) {
      throw new Error(err.message)
    }
  }
}

export default new UserSignInRepository()