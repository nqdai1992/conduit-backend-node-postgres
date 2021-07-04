import { IUser } from '@/domain/entities/user.entity';
import db from '../../infastructure/database';
import { IArticlePersitence } from './favorite-article.intefaces';

class FavoriteArticleRepository {
  async findAritcleBySlug (slug: string): Promise<IArticlePersitence> {
    try {
      const { rows } = await db.query("SELECT * FROM articles WHERE slug=$1", [slug])
      return rows[0]
    } catch (err) {
      throw new Error(err.message)
    }
  }
  async favoriteArticle (userId: number, articleId: number): Promise<number> {
    try {
      await db.query(`
        INSERT INTO favorites (user_id, article_id) 
        VALUES ($1, $2) 
        ON CONFLICT (user_id, article_id) 
        DO NOTHING`, [userId, articleId])

      const { rows } = await db.query(`
        SELECT count(*) FROM favorites WHERE article_id=$1
    `, [articleId])

      return rows[0].count
    } catch (err) {
      throw new Error(err.message)
    }  
  }
  async getAuthor (authorId: number): Promise<IUser> {      
    try {
      const { rows } = await db.query('SELECT * FROM users WHERE id=$1', [authorId])
      return rows[0]
    } catch (err) {
      throw new Error(err.message)
    }
  }
  async getFollowing (followerId: number, targetId: number) {
    try {
      const { rows } = await db.query('SELECT * FROM following WHERE follower_id=$1 AND target_id=$2', [followerId, targetId])
      return rows[0]
    } catch (err) {
      throw new Error(err.message)
    }
  }
}

export default new FavoriteArticleRepository()