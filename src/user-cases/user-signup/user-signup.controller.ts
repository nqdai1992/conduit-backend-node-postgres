import { Router } from 'express';
import UserSignUpService from './user-signup.service'
import UserSignUpRequestDTO from './user-signup.request.dto'
import { IUserSignUpRequestBody } from './user-signup.interface'
import AppRequest from '@/application/app-request.interface';
import UserUserResponseDTO from '@/interfaces/user.response.dto';

const router = Router();
const path = '/api/users'

router.post(path, async (req: AppRequest<IUserSignUpRequestBody>, res) => {
  try {
    const response = await UserSignUpService.createUser(
      UserSignUpRequestDTO(req.body)
    )

    res.status(201).json(UserUserResponseDTO(response));
  } catch (err) {   
    res.status(500).send(err.message)
  }  
})

export default router;