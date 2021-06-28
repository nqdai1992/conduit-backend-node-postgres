import db from '../../infastructure/database'
import { IUserSignUpParams } from './user-signup.interface';

class UserSignUpRepository {

  async userIsExist (username: string, email: string) {
    try {
      const { rows } = await db.query('SELECT email, username FROM users WHERE email=$1 OR username=$2', [email, username])
      return rows.length > 0;
    } catch (err) {
      throw new Error(err.message);
    }
  } 

  async createUser (userSignUpParams: IUserSignUpParams) {
    const { email, password, username } = userSignUpParams;
    
    try {
      const { rows } = await db.query('INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING *', [email, password, username])
      return rows[0]
    } catch (err) {
      throw new Error(err.message);
    }
    
  }
}

export default new UserSignUpRepository();