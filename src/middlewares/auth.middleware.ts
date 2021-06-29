import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt} from 'passport-jwt'
import db from '@/infastructure/database'

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}, function(jwt_payload, done) {
  const email = jwt_payload.email
  db.query('SELECT * FROM users WHERE email=$1', [email], (err, res) => {
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
}));

export const authenMiddleware = passport.authenticate('jwt', { session: false })
export default passport;