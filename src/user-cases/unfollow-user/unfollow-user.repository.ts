import db from '@/infastructure/database'

class UnfollowRepository {
  async removeFollowing (followerId: number, targetId: number) {
    try {
      const { rows } = await db.query('DELETE FROM following WHERE follower_id=$1 AND target_id=$2 RETURNING *', [followerId, targetId])
      return rows[0]
    } catch (err) {
      throw new Error(err.message)
    }
  }
}

export default new UnfollowRepository()