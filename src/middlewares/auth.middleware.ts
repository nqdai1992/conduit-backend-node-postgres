import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt} from 'passport-jwt'
import db from '@/infastructure/database'
import { NextFunction, Request, Response } from 'express';


const jwtStrategy = new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}, function(jwt_payload, done) {
  const userId = jwt_payload.id
  db.query('SELECT * FROM users WHERE id=$1', [userId], (err, res) => {
    const user = res.rows[0]

    if (err) {
      return done(err, false);
    }
    
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
    
  })
})

const authenticate = passport.use(jwtStrategy).authenticate('jwt', { session: false })

export const optionalAuthenMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  if (req.header('Authorization')) {
    authenticate(req, res, next)
  } else {
    next()
  }
}

export const requiredAuthenMiddleware = authenticate

export default passport;