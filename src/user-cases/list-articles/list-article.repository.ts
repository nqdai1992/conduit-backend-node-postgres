import db from '../../infastructure/database'

class ListArticleRepository {
  async getListArticleRepository ({
    tag = null,
    author = null,
    favorited = null,
    limit = 20,
    offset = 0
  }) {
    try {
      const { rows } = await db.query(`
        SELECT * from (
          SELECT 
                  articles.*,
                  to_json(author) as author,
                  array_agg(tags.label) as tag,
                  users.username as user_favorite
              FROM articles
              JOIN users as author ON articles.author_id=author.id
              LEFT JOIN articles_tags ON articles_tags.article_id=articles.id
              LEFT JOIN tags ON tags.id=articles_tags.tag_id
              LEFT JOIN favorites ON articles.id = favorites.article_id
              LEFT JOIN users ON users.id=favorites.user_id
              GROUP by articles.id, author.*, users.username
      ) as article_list
        WHERE 
            ($1 is null or article_list.tag=$1) AND
            ($2 is null or article_list.author_name=$2) AND
            ($3 is null or article_list.user_favorite=$3)
        LIMIT $4
        OFFSET $5
        `, [tag, author, favorited, limit, offset])

      return rows[0]
    } catch (err) {
      throw new Error(err.message)
    }
  }
}

export default new ListArticleRepository()