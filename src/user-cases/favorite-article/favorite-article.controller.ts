import { IUser } from '@/domain/entities/user.entity';
import ArticleResponseDTO from '@/dtos/article.response.dto';
import { requiredAuthenMiddleware } from '@/middlewares/auth.middleware';
import { Request, Router } from 'express'
import FavoriteArticleService from './favorite-article.service';

const router = Router();
const path = '/api/articles/:slug/favorite'

router.post(path, requiredAuthenMiddleware ,async (req: Request, res) => {
  try {
    const requester = req.user as IUser
    const article = await FavoriteArticleService.favoriteArticle(requester.id, req.params.slug)

    res.status(200).json(ArticleResponseDTO(article))
  } catch (err) {
    res.status(500).send(err.message)
  }
  
})

export default router
