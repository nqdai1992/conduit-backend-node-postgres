import User from '@/entities/user/User';

export enum SignUpErrors {
  USER_IS_EXISTED = 'USER_IS_EXISTED',
}
export interface SignUpResult {
  error?: SignUpErrors;
  user?: User;
  token?: string;
}
export default interface SignUpUseCaseInterface {
  signUp(
    username: string,
    email: string,
    password: string,
  ): Promise<SignUpResult>;
}
