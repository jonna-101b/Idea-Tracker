import axios, {
    AxiosError,
    type InternalAxiosRequestConfig,
} from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Used to prevent multiple refresh requests
let refreshPromise: Promise<void> | null = null;

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {

        const originalRequest = error.config as | (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;

        // No config? Just fail.
        if (!originalRequest) {
            return Promise.reject(error);
        }

        // Don't try to refresh if refresh endpoint itself failed
        if (originalRequest.url?.includes('/auth/refresh')) {
            return Promise.reject(error);
        }

        const isUnauthorized =
        error.response?.status === 401;

        if (isUnauthorized && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                if (!refreshPromise) {  // Only one refresh request at a time
                    refreshPromise = axiosInstance
                        .post('/auth/refresh')
                        .then(() => {})
                        .finally(() => {
                        refreshPromise = null;
                    });
                }

                await refreshPromise;

                // Retry original request
                return axiosInstance(originalRequest);
            } catch (refreshError) {    // Refresh token expired or invalid
                refreshPromise = null;
                
                // Let the caller (the startup session check or request saga)
                // handle the rejected request. Redirecting here can create a
                // refresh loop on the login page.
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
