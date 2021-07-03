import { ICreateArticleParmas } from "./create-article.interface";
import db from '../../infastructure/database'
import { ITag } from "@/domain/entities/tag.entity";
import { IArticle } from "@/domain/entities/article.entity";

class CreateArticleRepository {
  async createArticle (createArticleParams: ICreateArticleParmas): Promise<IArticle> {
    try {
      const { title, body, description, slug, authorId} = createArticleParams
      const { rows } = await db.query('INSERT INTO articles(title, slug, description, body, author_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [title, slug, description, body, authorId])

      return rows[0]
    } catch (err) {
      throw new Error(err.message)
    }
  }

  async createArticleTag (tag: string, articleId: number): Promise<ITag> {
    try {
      const tagResult = await db.query('INSERT INTO tags(label) VALUES ($1) ON CONFLICT (label) DO UPDATE SET label=$1 RETURNING *', [tag])
      const { id: tagId } = tagResult.rows[0]

      await db.query('INSERT INTO articles_tags (tag_id, article_id) VALUES ($1, $2) ON CONFLICT (tag_id, article_id) DO NOTHING', [tagId, articleId])
      
      return tagResult.rows[0]
    } catch (err) {
      throw new Error(err.message)
    }
  }
}

export default new CreateArticleRepository()