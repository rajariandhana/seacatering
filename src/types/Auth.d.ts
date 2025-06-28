import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface IRegister {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface ILogin {
    email: string;
    password: string;
}

interface UserExtended extends User {
    accessToken?: string;
    role?: string;
}

interface SessionExtended extends Session{
    accessToken?: string;
}

interface JWTExtended extends JWT{
    user?: UserExtended;
}

export type {IRegister, ILogin, UserExtended, SessionExtended, JWTExtended};