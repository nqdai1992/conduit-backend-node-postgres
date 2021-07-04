import Article, { IArticle } from "@/domain/entities/article.entity";
import { ITag } from "@/domain/entities/tag.entity";
import { ICreateArticleRequest } from "./create-article.interface";
import CreateArticleRepository from "./create-article.repository";

class CreateArticleService {
  async createArticle (articleRequest: ICreateArticleRequest, authorId: number): Promise<IArticle> {
    const article = Article(articleRequest)
    const { title, slug, body, description } = article.toObject()
    
    const tags = article.toObject().tagList

    const createdArticle = await CreateArticleRepository.createArticle( { title, slug, body, description, authorId } )

    const promiseResultList =  await Promise.allSettled(tags.map(async (tag) => await CreateArticleRepository.createArticleTag(tag, createdArticle.id)))

    const newTagList = promiseResultList.filter(result =>  result.status === 'fulfilled').map((result: PromiseFulfilledResult<ITag>) => result.value.label)

    return {
      ...createdArticle,
      tagList: newTagList
    }
        
  }
}

export default new CreateArticleService()