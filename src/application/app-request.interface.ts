import { Request } from "express";

export default interface AppRequest<T> extends Request {
    body: T
}