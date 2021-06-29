import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt} from 'passport-jwt'
import db from '@/infastructure/database'

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}, function(jwt_payload, done) {
  const username = jwt_payload.username
  db.query('SELECT * FROM users WHERE username=$1', [username], (err, res) => {
    const user = res.rows[0]

    console.log('User: ', user)

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