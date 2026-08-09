import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../models/user.model";
import type { UpdateUserPayload } from "../../models/user.model";

interface AdminState {
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState : AdminState = {
    users: [],
    loading: true,
    error: null,
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        fetchUsers: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchSuccess: (state, action: PayloadAction<User[]>) => {
            state.loading = false;
            state.error = null;
            state.users = action.payload;
        },
        fetchFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
            state.users = [];
        },
        updateUser: (state, _action: PayloadAction<UpdateUserPayload>) => {
            state.loading = true;
            state.error = null;
        },
        updateSuccess: (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.error = null;
            const index = state.users.findIndex((user) => user._id === action.payload._id)
            if (index != -1) state.users[index] = action.payload;
        },
        updateFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteUser: (state, _action: PayloadAction<string>) => {
            state.loading = true;
            state.error = null;
        },
        deleteSuccess: (state, action: PayloadAction<User>) => {
            state.loading = false;
            state.error = null;
            state.users = state.users.filter((user) => user._id !== action.payload._id)
        },
        deleteFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchUsers,
    fetchSuccess,
    fetchFailure,
    updateUser,
    updateSuccess,
    updateFailure,
    deleteUser,
    deleteSuccess,
    deleteFailure,
} = adminSlice.actions;

export default adminSlice.reducer;