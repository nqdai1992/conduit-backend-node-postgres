import { Router } from 'express'
import APIError from '@/errorHandler/APIError';
import HttpStatusCode from '@/errorHandler/HttpStatusCode';
import ProfileResponseDTO from '@/dtos/profile.response.dto';
import GetProfileService from './get-profile.service';
import { optionalAuthenMiddleware } from '@/middlewares/auth.middleware';
import { IUser } from '@/domain/entities/user.entity';

const path = '/api/profiles/:username'

const router = Router();

router.get(path, optionalAuthenMiddleware, async (req, res) => {
  try {
    const username = req.params.username
   
    if (!username) {
      throw new APIError(
        'BAD REQUEST',
        HttpStatusCode.BAD_REQUEST,
        true,
        'username is undefined'
      )
    }

    const requester = req.user as IUser
    
    let profile = null

    if (!requester) {
      profile = await GetProfileService.getProfileWithoutAuthen(username)
    } else {
      profile = await GetProfileService.getProfileRequireAuthen(requester.id, username)
    }

    if (!profile) {
      throw new APIError(
        'NOT FOUND',
        HttpStatusCode.NOT_FOUND,
        true,
        'profile is not found'
      )
    }

    res.status(200).json(ProfileResponseDTO(profile))

  } catch (err) {
    
    res.status(500).send(err.message)
  }
})

export default router;