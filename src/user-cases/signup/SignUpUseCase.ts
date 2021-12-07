import User from '@/entities/user/User';
import SignUpUseCaseInterface, {
  SignUpErrors,
  SignUpResult,
} from './SignUpUseCaseInterface';
import SignUpPersistenceInterface from './SignUpPersistenceInterface';
import jsonwebtoken from 'jsonwebtoken';

export default class SignUpUseCase implements SignUpUseCaseInterface {
  constructor(private signUpPersistence: SignUpPersistenceInterface) {}

  private async userIsExisted(
    username: string,
    email: string,
  ): Promise<boolean> {
    const user = await this.signUpPersistence.findUser(username, email);

    if (!user) return false;

    return true;
  }

  private createToken(user: User): string {
    return jsonwebtoken.sign(
      {
        email: user.email,
        username: user.username,
      },
      process.env.SECRET_KEY,
    );
  }

  async signUp(
    username: string,
    email: string,
    password: string,
  ): Promise<SignUpResult> {
    const userIsExisted = await this.userIsExisted(username, email);

    if (userIsExisted) {
      return {
        error: SignUpErrors.USER_IS_EXISTED,
      };
    }

    const user = await User.createUserWithoutId(username, email, password);
    const token = this.createToken(user);

    await this.signUpPersistence.saveUser(user);

    return {
      user,
      token,
    };
  }
}
