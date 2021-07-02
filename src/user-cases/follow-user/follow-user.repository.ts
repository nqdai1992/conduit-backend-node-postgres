import db from '@/infastructure/database'

class FollowUserRepository {
  async createFollowing (followerId: number, targetId: number) {
    try {
      const { rows } = await db.query('INSERT INTO following (follower_id, target_id) VALUES ($1, $2) RETURNING *', [followerId, targetId])
      return rows[0]
    } catch (err) {
      return new Error(err.message)
    }
  }
}

export default new FollowUserRepository()