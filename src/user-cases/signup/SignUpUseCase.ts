import User from "@/entities/user/User";
import SignUpControllerInputPort from "./SignUpControllerInputPort";
import SignUpPersistenceOutputPort from "./SignUpPersistenceOutputPort";
import jsonwebtoken from 'jsonwebtoken';

export default class SignUpUseCase implements SignUpControllerInputPort {
    constructor (private signUpPersistence: SignUpPersistenceOutputPort) {}

    async userIsExisted (username: string, email: string): Promise<boolean> {
        const user = await this.signUpPersistence.findUser(username, email)

        if (!user) return false

        return true
    }

    createToken (user: User): string {
        return jsonwebtoken.sign({
            email: user.email,
            username: user.username
        }, process.env.SECRET_KEY)
    }

    async registerUser (username: string, email: string, password: string): Promise<User> {
        const user = await User.createUserWithoutId(username, email, password)
        
        await this.signUpPersistence.saveUser(user.username, user.email, user.password)

        return user
    }
}