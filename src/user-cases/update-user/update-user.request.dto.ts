import { IUpdateUserRequestBody, IUpdateUserRequestDTO } from "./update-user.interface";
import Ajv from 'ajv';
import HttpStatusCode from "@/errorHandler/HttpStatusCode";
import APIError from '@/errorHandler/APIError'

const ajv = new Ajv();

const UpdateUserRequestSchema = { 
  type: 'object',
  properties: {
    user: { 
      type: 'object',
      properties: {
        email: {
          type: 'string'
        },
        password: {
          type: 'string'
        },
        username: {
          type: 'string',
        },
        image: {
          type: 'string',
        },
        bio: {
          type: 'string'
        }
      },
      additionalProperties: false
    }
  },
  additionalProperties: false
}

const UpdateUserRequestDTO = (requestBody: IUpdateUserRequestBody): IUpdateUserRequestDTO => {
  const isValid = ajv.validate(UpdateUserRequestSchema, requestBody)
  

  if (!isValid) throw new APIError(
    'BAD REQUEST',
    HttpStatusCode.BAD_REQUEST,
    true,
    ajv.errors[0].message
  )

  const dataObject: IUpdateUserRequestDTO = {}

  if (requestBody.user.email) {
    dataObject.email = requestBody.user.email
  }

  if (requestBody.user.username) {
    dataObject.username = requestBody.user.username
  }

  if (requestBody.user.password) {
    dataObject.password = requestBody.user.password
  }

  if (requestBody.user.image) {
    dataObject.image = requestBody.user.image
  }

  if (requestBody.user.bio) {
    dataObject.bio = requestBody.user.bio
  }

  return dataObject
}

export default UpdateUserRequestDTO