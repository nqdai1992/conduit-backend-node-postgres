import { Router } from 'express';
import AppRequest from '@/application/app-request.interface';
import { IUserSignInRequestBody } from './user-signin.interface';
import UserSignInRequestDTO from './user-signin.request.dto';
import UserSigninService from './user-signin.service';
import UserUserResponseDTO from '@/interfaces/user.response.dto';


const router = Router();
const path = '/api/users/login'

router.post(path, async (req: AppRequest<IUserSignInRequestBody>, res) => {
  try {
    const { email, password } = UserSignInRequestDTO(req.body)
    const response = await UserSigninService.signIn(email, password)

    res.status(200).json(UserUserResponseDTO(response));
  } catch (err) {   
    res.status(500).send(err.message)
  }  
})

export default router;