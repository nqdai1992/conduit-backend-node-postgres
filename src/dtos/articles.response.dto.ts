import { IArticle } from "@/domain/entities/article.entity"

export interface IArticlesResponseDTO {
    articles: IArticle[]
}

const ArticlesResponseDTO = (articles: IArticle[]): IArticlesResponseDTO => {
  return {
    articles
  }
}

export default ArticlesResponseDTO