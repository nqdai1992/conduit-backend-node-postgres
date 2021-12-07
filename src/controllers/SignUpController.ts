import Ajv from 'ajv';
import { Router } from 'express';
import AppRequest from '@/application/app-request.interface';
import APIError from '@/errorHandler/APIError';
import HttpStatusCode from '@/errorHandler/HttpStatusCode';
import SignUpUseCaseInterface, {
  SignUpErrors,
} from '@/user-cases/signup/SignUpUseCaseInterface';

const ajv = new Ajv();

const UserSignUpRequestSchema = {
  type: 'object',
  properties: {
    user: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
        username: {
          type: 'string',
          pattern: '^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$', // Follow the solution: https://stackoverflow.com/questions/12018245/regular-expression-to-validate-username
        },
      },
      required: ['email', 'password', 'username'],
      additionalProperties: false,
    },
  },
  additionalProperties: false,
};

export default function SignUpController(
  signUpUseCase: SignUpUseCaseInterface,
) {
  const router = Router();
  const path = '/api/users';

  router.post(
    path,
    async (
      req: AppRequest<{
        user: {
          email: string;
          password: string;
          username: string;
        };
      }>,
      res,
    ) => {
      const isValid = ajv.validate(UserSignUpRequestSchema, req.body);

      if (!isValid)
        throw new APIError(
          'BAD REQUEST',
          HttpStatusCode.BAD_REQUEST,
          true,
          ajv.errors[0].message,
        );

      const { user } = req.body;

      const signUpResult = await signUpUseCase.signUp(
        user.username,
        user.email,
        user.password,
      );

      if (signUpResult.error === SignUpErrors.USER_IS_EXISTED) {
        throw new APIError(
          'CONFLICT',
          HttpStatusCode.CONFLICT,
          true,
          'user is already exist',
        );
      }

      res.status(HttpStatusCode.CREATED).json({
        user: {
          email: signUpResult.user.email,
          username: signUpResult.user.username,
          token: signUpResult.token,
        },
      });
    },
  );

  return router;
}
