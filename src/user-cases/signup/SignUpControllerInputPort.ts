import User from "@/entities/user/User";

export default interface SignUpControllerInputPort {
    userIsExisted(username: string, email: string): Promise<boolean>;
    createToken (user: User): string;
    registerUser(username: string, email: string, password: string): Promise<User>;
}