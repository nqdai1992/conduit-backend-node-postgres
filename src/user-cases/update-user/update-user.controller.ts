import AppRequest from '@/application/app-request.interface';
import { IUser } from '@/domain/entities/user.entity';
import UserResponseDTO from '@/dtos/user.response.dto';
import { authenMiddleware } from '@/middlewares/auth.middleware';
import { Router } from 'express'
import { IUpdateUserRequestBody } from './update-user.interface';
import UpdateUserRequestDTO from './update-user.request.dto';
import UpdateUserService from './update-user.service';

const path = '/api/user'

const router = Router();

router.put(path, authenMiddleware, async (req: AppRequest<IUpdateUserRequestBody>, res) => {
  try {
    const updateUserRequest = UpdateUserRequestDTO(req.body)
    const updatedUser = await UpdateUserService.updateUser(req.user as IUser, updateUserRequest)
    
    res.status(200).json(UserResponseDTO(updatedUser))
  } catch (err) {
    console.log(err)
    res.status(500).send(err.message)
  }
})

export default router;