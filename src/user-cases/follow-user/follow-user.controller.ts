import { Router } from 'express'
import { requiredAuthenMiddleware } from '@/middlewares/auth.middleware';
import FollowUserService from './follow-user.service';
import { IUser } from '@/domain/entities/user.entity';
import ProfileResponseDTO from '@/dtos/profile.response.dto';

const router = Router();
const path = '/api/profiles/:username/follow'

router.post(path, requiredAuthenMiddleware , async (req, res) => {
  const requester = req.user as IUser
  const profile = await FollowUserService.followUser(requester.id, req.params.username)

  res.status(201).json(ProfileResponseDTO(profile))
})

export default router