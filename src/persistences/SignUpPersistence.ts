import db from '../infastructure/database'
import SignUpPersistenceOutputPort from '../user-cases/signup/SignUpPersistenceOutputPort'

class SignUpPersistence implements SignUpPersistenceOutputPort{
    async findUser (username: string, email: string) {
        try {
            const { rows } = await db.query('SELECT email, username FROM users WHERE email=$1 OR username=$2', [email, username])
            
            return {
                username: rows[0].username,
                email: rows[0].email
            }

          } catch (err) {
            throw new Error(err.message);
          }
    }
    async saveUser (username: string, email: string, password: string) {
        try {
            const { rows } = await db.query('INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING *', [email, password, username])

            return {
                username: rows[0].username,
                email: rows[0].email
            }
          } catch (err) {
            throw new Error(err.message);
          }
    }
}

export default new SignUpPersistence();