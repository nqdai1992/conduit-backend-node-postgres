import { optionalAuthenMiddleware } from '@/middlewares/auth.middleware';
import { Request, Router } from 'express'

const router = Router();
const path = '/api/articles'

router.get(path, optionalAuthenMiddleware ,async (req: Request<Record<string, unknown>, Record<string, unknown>, Record<string, unknown>, {
    tag?: string,
    author?: string,
    favorited?: string,
    limit?:number,
    offset?:number
}>, res) => {
  try {
    console.log(123)
  } catch (err) {
    res.status(500).send(err.message)
  }
  
})

export default router
