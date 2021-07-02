import { Router } from 'express'
import { IUser } from '@/domain/entities/user.entity';
import UserResponseDTO from '@/dtos/user.response.dto';
import { requiredAuthenMiddleware } from '@/middlewares/auth.middleware';


const router = Router();
const path = '/api/user'

router.get(path, requiredAuthenMiddleware ,async (req, res) => {
  return res.status(200).json(UserResponseDTO(req.user as IUser))
})

export default router