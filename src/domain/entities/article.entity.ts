import { formmatDateOnSlug } from "@/utils/date";

export interface IArticeAuthor {
  username: string,
  bio: string,
  image: string,
  following: boolean
}
export interface IArticle {
  id?: number;
  title: string;
  slug?: string;
  description?: string;
  body?: string;
  tagList?: string[];
  favorited?: boolean;
  favoritesCount?: number;
  author?: IArticeAuthor;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ArticleEntity {
  toObject: () => IArticle;
  update: (newArticle: Omit<IArticle, "createdAt" | "updatedAt">) => ArticleEntity;
}

//The solution at https://gist.github.com/codeguy/6684588
const createSlug = (title: string) => {
  title = title.replace(/^\s+|\s+$/g, ''); // trim
  title = title.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  const to   = "aaaaeeeeiiiioooouuuunc------";
  
  for (let i = 0; i < from.length; i++) {
    title = title.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  title = title.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return `${title}-${formmatDateOnSlug(Date.now())}`;
}

const mergeTagList = (tagList1: string[], tagList2: string[]) => {
  const convertedTagList1 = tagList1.map(tag => tag.toLowerCase())
  const convertedTagList2 = tagList2.map(tag => tag.toLowerCase())

  return [...new Set([...convertedTagList1, ...convertedTagList2])]
}



const Article = (initArticle: IArticle): ArticleEntity => {
  initArticle.slug = initArticle.slug || createSlug(initArticle.title)
  initArticle.tagList = initArticle.tagList.map(tag => tag.toLowerCase())

  return {
    toObject: () => initArticle,
    update: (newArticle: Omit<IArticle, "createdAt" | "updatedAt">) => {
      const { title, description, slug, body, tagList = [], favorited } = newArticle;
      const shouldBeRegenerateSlug = title.toLowerCase() !== initArticle.title.toLowerCase()
      
      return Article({
        ...initArticle,
        title, 
        description, 
        slug: shouldBeRegenerateSlug ? createSlug(title) : slug, 
        body, 
        tagList: mergeTagList(initArticle.tagList, tagList), 
        favorited
      })
    }
  }
}

export default Article;