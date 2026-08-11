import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../models/user.model";


export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    // `false` only while the app is asking the API to validate cookie-based auth.
    // Route guards must wait for this before deciding to redirect.
    isSessionChecked: boolean;
    loading: boolean;
    error: string | null;
}

const initialState : AuthState = {
    user: null,
    isAuthenticated: false,
    isSessionChecked: false,
    loading: false,
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signup: (state, _action: PayloadAction<{ name: string, email: string, password: string }>) => {
            state.loading = true;
            state.error = null;
        },
        login: (state, _action: PayloadAction<{ email: string, password: string }>) => {
            state.loading = true;
            state.error = null;
        },
        checkSession: (state) => {
            state.isSessionChecked = false;
        },
        authSuccess: (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.error = null;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.isSessionChecked = true;
        },
        authFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
            state.isSessionChecked = true;
            state.user = null;
        },
        sessionCheckFailed: (state) => {
            // An expired/no-session response is expected on the login page, so do
            // not surface it as a login form error.
            state.loading = false;
            state.error = null;
            state.isAuthenticated = false;
            state.user = null;
            state.isSessionChecked = true;
        },
        logout: (state) => {
            state.loading = true;
            state.error = null;
        },
        logoutSuccess: (state) => {
            state.loading = false;
            state.error = null;
            state.isAuthenticated = false;
            state.user = null;
            state.isSessionChecked = true;
        },
    }
});

export const {
    signup,
    login,
    checkSession,
    authSuccess,
    authFailure,
    sessionCheckFailed,
    logout,
    logoutSuccess
} = authSlice.actions;

export default authSlice.reducer;
