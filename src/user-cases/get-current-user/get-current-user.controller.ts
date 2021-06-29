import { IUser } from '@/domain/entities/user.entity';
import UserResponseDTO from '@/dtos/user.response.dto';
import { authenMiddleware } from '@/middlewares/auth.middleware';
import { Router } from 'express'

const router = Router();
const path = '/api/user'

router.get(path, authenMiddleware ,async (req, res) => {
  return res.status(200).json(UserResponseDTO(req.user as IUser))
})

export default router