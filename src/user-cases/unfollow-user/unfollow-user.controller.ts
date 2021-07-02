import { Router } from 'express'
import { requiredAuthenMiddleware } from '@/middlewares/auth.middleware';
import ProfileResponseDTO from '@/dtos/profile.response.dto';
import UnfollowUserService from './unfollow-user.service';
import { IUser } from '@/domain/entities/user.entity';

const router = Router();
const path = '/api/profiles/:username/follow'

router.delete(path, requiredAuthenMiddleware , async (req, res) => {
  const requester = req.user as IUser
  const profile = await UnfollowUserService.unfollowUser(requester.id, req.params.username)

  res.status(200).json(ProfileResponseDTO(profile))
})

export default router