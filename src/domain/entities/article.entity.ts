import { IUser } from "@/domain/entities/user.entity";
import { ITag } from "./tag.entity";

export interface IArticle {
  title: string;
  slug: string;
  description: string;
  body: string;
  tagList: ITag[];
  favorited: boolean;
  favoritesCount: number;
  author: Omit<IUser, "password">;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ArticleEntity {
  toObject: () => IArticle;
  update: (newArticle: Omit<IArticle, "createdAt" | "updatedAt">) => ArticleEntity;
}

const Article = (initArticle: IArticle): ArticleEntity => ({
  toObject: () => initArticle,
  update: (newArticle: Omit<IArticle, "createdAt" | "updatedAt">) => {
    const { title, description, slug, body, tagList = [], favorited } = newArticle;
    
    return Article({
      ...initArticle,
      title, 
      description, 
      slug, 
      body, 
      tagList: [...initArticle.tagList, ...tagList], 
      favorited
    })
  }
})

export default Article;