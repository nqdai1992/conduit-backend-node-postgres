import db from '../infastructure/database';
import SignUpPersistenceInterface from '../user-cases/signup/SignUpPersistenceInterface';

class SignUpPersistence implements SignUpPersistenceInterface {
  async findUser(
    username: string,
    email: string,
  ) {
    try {
      const {
        rows,
      } = await db.query(
        'SELECT email, username FROM users WHERE email=$1 OR username=$2',
        [email, username],
      );

      if (!rows[0]) return null;
      
      return {
        username: rows[0].username,
        email: rows[0].email,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }
  async saveUser(user) {
    try {
      const {
        rows,
      } = await db.query(
        'INSERT INTO users (uuid, email, password, username) VALUES ($1, $2, $3, $4) RETURNING *',
        [user.id, user.email, user.password, user.username],
      );

      return {
        username: rows[0].username,
        email: rows[0].email,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default new SignUpPersistence();
