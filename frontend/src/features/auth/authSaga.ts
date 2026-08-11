import { call, put, takeLatest } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import { authFailure, authSuccess, checkSession, login, logout, logoutSuccess, sessionCheckFailed, signup } from "./authSlice";
import type { User } from '../../models/user.model';
import { makeCall } from "../../api/makeCall";
import { APIRoutes } from "../../api/APIRoutes";
import type { APIConfig } from "../../api/types";

function* handleSignup(action: PayloadAction<Parameters<typeof signup >[0]>) : Generator {
    try {
        const config : APIConfig = { route: APIRoutes.signup, data: action.payload };
        const res: User = yield call(makeCall, config);
        yield put(authSuccess(res))
    }
    catch (error: any) {
        const msg = error.response?.data?.message || 'Login failed';
        yield put(authFailure(msg));
    }
}

function* handleLogin(action: PayloadAction<Parameters<typeof login>[0]>) : Generator {
    try {
        const config : APIConfig = { route: APIRoutes.login, data: action.payload };
        const res : User = yield call(makeCall, config);
        yield put(authSuccess(res))
    }
    catch (error: any) {
        const msg = error.response?.data?.message || 'Login failed';
        yield put(authFailure(msg));
    }
}

function* handleLogout() {
    try {
        const config : APIConfig = { route: APIRoutes.logout };
        yield call(makeCall, config);
    }
    catch {
        // Handle server error
    }
    finally {
        yield put(logoutSuccess())
    }
}

function* handleCheckSession(): Generator {
    try {
        // The browser attaches the HttpOnly access-token cookie. If it has expired,
        // the Axios interceptor refreshes it and retries this request once.
        const config: APIConfig = { route: APIRoutes.getProfile };
        const res: User = yield call(makeCall, config);
        yield put(authSuccess(res));
    } catch {
        yield put(sessionCheckFailed());
    }
}

export default function* watchAuthSagas() {
    yield takeLatest(signup.type, handleSignup);
    yield takeLatest(login.type, handleLogin);
    yield takeLatest(logout.type, handleLogout);
    yield takeLatest(checkSession.type, handleCheckSession);
}
