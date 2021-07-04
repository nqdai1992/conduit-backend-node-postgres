import { IArticle } from "@/domain/entities/article.entity"
import APIError from "@/errorHandler/APIError"
import HttpStatusCode from "@/errorHandler/HttpStatusCode"
import FavoriteArticleRepository from "./favorite-article.repository"

class FavoriteArticleService {
  async favoriteArticle (userId: number, slug: string): Promise<IArticle> {
    const article = await FavoriteArticleRepository.findAritcleBySlug(slug)

    if (!article) {
      throw new APIError(
        'NOT FOUND',
        HttpStatusCode.NOT_FOUND,
        true,
        'article is not found'
      )
    }

    const favoriteCount = await FavoriteArticleRepository.favoriteArticle(userId, article.id)
    const author = await FavoriteArticleRepository.getAuthor(article.author_id)
    const isFollowedAuthor = await FavoriteArticleRepository.getFollowing(userId, author.id)

    return {
      ...article,
      favorited: true,
      favoritesCount: favoriteCount,
      author: {
        username: author.username,
        bio: author.bio,
        image: author.bio,
        following: !!isFollowedAuthor
      }
    }
  }
}

export default new FavoriteArticleService()