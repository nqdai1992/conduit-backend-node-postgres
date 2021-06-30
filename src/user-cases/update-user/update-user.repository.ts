import { IUser } from '@/domain/entities/user.entity'
import db from '@/infastructure/database'

class UpdateUserInRepository {
  async updateUser (updatedUserInfo: IUser): Promise<IUser> {
    const {email, username, password, image, bio, id} = updatedUserInfo
    
    try {
      const { rows } = await db.query('UPDATE users SET email=$1, username=$2, password=$3, image=$4, bio=$5 WHERE id=$6 RETURNING *', [email, username, password, image, bio, id])
      return rows[0]
    } catch (err) {
      throw new Error(err.message)
    }
  }
}

export default new UpdateUserInRepository()