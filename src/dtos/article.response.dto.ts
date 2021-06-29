import { IArticle } from "@/domain/entities/article.entity"

export interface IArticleResponseDTO {
    article: IArticle
}

const ArticleResponseDTO = (article: IArticle): IArticleResponseDTO => {
  return {
    article
  }
}

export default ArticleResponseDTO