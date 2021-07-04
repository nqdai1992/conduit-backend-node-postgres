import HttpStatusCode from '@/errorHandler/HttpStatusCode';
import APIError from '@/errorHandler/APIError'
import Ajv from 'ajv';
import { IUserSignUpRequestBody, IUserSignUpRequestDTO } from './user-signup.interface';

const ajv = new Ajv();

const UserSignUpRequestSchema = {
  type: 'object',
  properties: {
    user: { 
      type: 'object',
      properties: {
        email: { type: 'string',  },
        password: { type: 'string' },
        username: { 
          type: 'string', 
          pattern: '^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$', // Follow the solution: https://stackoverflow.com/questions/12018245/regular-expression-to-validate-username
        }
      },
      required: ['email', 'password', 'username'],
      additionalProperties: false,
    } 
  },
  additionalProperties: false,
};

const UserSignUpRequestDTO = (requestBody: IUserSignUpRequestBody): IUserSignUpRequestDTO => {
  const isValid = ajv.validate(UserSignUpRequestSchema, requestBody)

  if (!isValid) throw new APIError(
    'BAD REQUEST',
    HttpStatusCode.BAD_REQUEST,
    true,
    ajv.errors[0].message
  )
  
  return {
    email: requestBody.user.email,
    password: requestBody.user.password,
    username: requestBody.user.username
  }
}

export default UserSignUpRequestDTO;