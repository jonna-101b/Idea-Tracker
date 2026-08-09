import { call, put, takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import { authFailure, authSuccess, login, logout, logoutSuccess, signup, type User } from "./authSlice";
import { makeCall } from "../../api/makeCall";
import { APIRoutes } from "../../api/APIRoutes";

function* handleSignup(action: PayloadAction<Parameters<typeof signup >[0]>) : Generator {
    try {
        const config = { route: APIRoutes.signup, data: action.payload, withCredentials: true };
        const res: any = yield call(makeCall, config);
        yield put(authSuccess(res.data.user as User))
    }
    catch (error: any) {
        const msg = error.response?.data?.message || 'Login failed';
        yield put(authFailure(msg));
    }
}

function* handleLogin(action: PayloadAction<Parameters<typeof login>[0]>) : Generator {
    try {
        const config = { route: APIRoutes.login, data: action.payload, withCredentials: true };
        const res : any = yield call(makeCall, config);
        yield put(authSuccess(res.data.user))
    }
    catch (error: any) {
        const msg = error.response?.data?.message || 'Login failed';
        yield put(authFailure(msg));
    }
}

function* handleLogout() {
    try {
        const config = { route: APIRoutes.logout, withCredentials: true };
        yield call(makeCall, config);
    }
    catch (error: any) {
        // Handle server error
    }
    finally {
        yield put(logoutSuccess)
    }
}

export default function* watchAuthSagas() {
    yield takeLatest(signup.type, handleSignup);
    yield takeLatest(login.type, handleLogin);
    yield takeLatest(logout.type, handleLogout);
}