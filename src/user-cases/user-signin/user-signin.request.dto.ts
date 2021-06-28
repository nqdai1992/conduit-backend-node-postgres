import HttpStatusCode from '@/errorHandler/HttpStatusCode';
import APIError from '@/errorHandler/APIError'
import Ajv from 'ajv';
import { IUserSignInRequestBody, IUserSignInRequestDTO } from './user-signin.interface';

const ajv = new Ajv();

const UserSignInRequestSchema = {
  type: 'object',
  properties: {
    user: { 
      type: 'object',
      properties: {
        email: { type: 'string',  },
        password: { type: 'string' },
      },
      required: ['email', 'password'],
      additionalProperties: false,
    } 
  },
  additionalProperties: false,
};

const UserSignInRequestDTO = (requestBody: IUserSignInRequestBody): IUserSignInRequestDTO  => {
  const isValid = ajv.validate(UserSignInRequestSchema, requestBody)

  if (!isValid) throw new APIError(
    'BAD REQUEST',
    HttpStatusCode.BAD_REQUEST,
    true,
    ajv.errors[0].message
  )
  
  return {
    email: requestBody.user.email,
    password: requestBody.user.password,
  }
}

export default UserSignInRequestDTO;