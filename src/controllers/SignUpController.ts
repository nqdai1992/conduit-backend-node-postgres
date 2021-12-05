import Ajv from 'ajv';
import { Router } from 'express';
import AppRequest from '@/application/app-request.interface';
import APIError from '@/errorHandler/APIError';
import HttpStatusCode from '@/errorHandler/HttpStatusCode';
import SignUpControllerInputPort from '@/user-cases/signup/SignUpControllerInputPort';

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
  signUpUseCase: SignUpControllerInputPort,
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
      try {
        const isValid = ajv.validate(UserSignUpRequestSchema, req.body);

        if (!isValid)
          throw new APIError(
            'BAD REQUEST',
            HttpStatusCode.BAD_REQUEST,
            true,
            ajv.errors[0].message,
          );

        const { user: userInfo } = req.body;

        const userIsExisted = await signUpUseCase.userIsExisted(
          userInfo.username,
          userInfo.email,
        );

        if (userIsExisted) {
          throw new APIError(
            'CONFLICT',
            HttpStatusCode.CONFLICT,
            true,
            'user is already exist',
          );
        }

        const user = await signUpUseCase.registerUser(
          userInfo.username,
          userInfo.email,
          userInfo.password,
        );

        const token = signUpUseCase.createToken(user);

        res.status(201).json({
          user: {
            email: user.email,
            username: user.username,
            token,
          },
        });
      } catch (err) {
        res.status(500).send(err.message);
      }
    },
  );

  return router;
}
