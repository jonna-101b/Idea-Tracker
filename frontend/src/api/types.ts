import { type Method } from "axios";
import { errorCodes } from "./errorCodes";


export type ErrorCodes = (typeof errorCodes)[keyof typeof errorCodes];;

export interface APIRoute {
    path: string;
    method: Method;
}

export interface APIConfig<TParams = unknown, TData = unknown> {
    route: APIRoute;
    params?: TParams;
    pathParams?: Record<string, string | number>;
    data?: TData;
}

export interface TAPIError {
    message: string;
    code: ErrorCodes;
    status?: number;
    data?: unknown;
}