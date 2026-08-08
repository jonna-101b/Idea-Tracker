import axios, { AxiosError } from 'axios';
import type { APIConfig } from './types';
import { errorCodes } from './errorCodes';
import { APIError } from './APIError';


const axiosInstance = axios.create({
    baseURL: "",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const makeCall = async <TParams = unknown, TData = unknown, TResponse = unknown>(config: APIConfig<TParams, TData>) => {
    const { route, params, pathParams, data, headers } = config;

    let url = route.path;

    if (pathParams) {
        Object.entries(pathParams).forEach(([key, value]) => {
            url = url.replace(`${key}`, String(value));
        })
    }

    try {
        const response = await axiosInstance.request<TResponse>({
            url: url,
            method: route.method,
            data: data,
            params: params,
            headers: headers,
        });
        return response.data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ message?: string; errors?: unknown }>;
            const status = axiosError.response?.status;
            const responseData = axiosError.response?.data;
            const message = responseData?.message || axiosError.message || 'An error occured';

            let code = null;

            if (!axiosError.response) {
                code = errorCodes.NETWORK_ERROR;
            } else if (status === 401) {
                code = errorCodes.UNAUTHORIZED;
            } else if (status === 403) {
                code = errorCodes.FORBIDDEN;
            } else if (status === 404) {
                code = errorCodes.NOT_FOUND;
            } else if (status === 400) {
                code = errorCodes.VALIDATION_ERROR;
            } else if (status && status >= 500) {
                code = errorCodes.SERVER_ERROR;
            } else {
                code = errorCodes.UNKNOWN_ERROR;
            }

            throw new APIError({
                message,
                code,
                status,
                data: responseData,
            });

        }
        throw new APIError({
            message: error instanceof Error ? error.message : 'Unknown error',
            code: errorCodes.UNKNOWN_ERROR,
        });
    }
    
};