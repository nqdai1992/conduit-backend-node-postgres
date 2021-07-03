import AppRequest from '@/application/app-request.interface';
import { IUser } from '@/domain/entities/user.entity';
import ArticleResponseDTO from '@/dtos/article.response.dto';
import { requiredAuthenMiddleware } from '@/middlewares/auth.middleware';
import { Router } from 'express'
import { ICreateArticleRequestBody } from './create-article.interface';
import CreateArticleRequestDTO from './create-article.request.dto';
import CreateArticleService from './create-article.service';

const router = Router();
const path = '/api/articles'

router.post(path, requiredAuthenMiddleware ,async (req: AppRequest<ICreateArticleRequestBody>, res) => {
  try {
    const author = req.user as IUser
    const createArticleRequest = CreateArticleRequestDTO(req.body)
    const article = await CreateArticleService.createArticle(createArticleRequest, author.id)

    res.status(201).json(ArticleResponseDTO(article))
  } catch (err) {
    res.status(500).send(err.message)
  }
  
})

export default router
