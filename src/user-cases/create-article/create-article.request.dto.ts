import Ajv from 'ajv';
import HttpStatusCode from "@/errorHandler/HttpStatusCode";
import APIError from '@/errorHandler/APIError'
import { ICreateArticleRequest, ICreateArticleRequestBody } from './create-article.interface';

const ajv = new Ajv();

const CreateUserRequestSchema = { 
  type: 'object',
  properties: {
    article: { 
      type: 'object',
      properties: {
        title: {
          type: 'string'
        },
        description: {
          type: 'string'
        },
        body: {
          type: 'string',
        },
        tagList: {
          type: 'array',
          uniqueItems: true,
          items: {
            type: 'string'
          }
        },
      },
      required: ['title', 'description', 'body'],
    }
  },
  additionalProperties: false
}

const CreateArticleRequestDTO = (requestBody: ICreateArticleRequestBody): ICreateArticleRequest => {
  const isValid = ajv.validate(CreateUserRequestSchema, requestBody)

  if (!isValid) throw new APIError(
    'BAD REQUEST',
    HttpStatusCode.BAD_REQUEST,
    true,
    ajv.errors[0].message
  )

  const {title, body, description, tagList} = requestBody.article

  return {
    title,
    body,
    description,
    tagList: tagList || []
  }
}

export default CreateArticleRequestDTO