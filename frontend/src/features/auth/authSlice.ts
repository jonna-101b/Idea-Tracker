import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../models/user.model";


export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState : AuthState = {
    user: null,
    isAuthenticated: false,
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
        authSuccess: (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.error = null;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        authFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
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
        },
    }
});

export const {
    signup,
    login,
    authSuccess,
    authFailure,
    logout,
    logoutSuccess
} = authSlice.actions;

export default authSlice.reducer;