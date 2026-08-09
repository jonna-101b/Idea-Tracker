import { call, put, takeLatest } from "redux-saga/effects";
import { deleteFailure, deleteUser, deleteSuccess, fetchFailure, fetchUsers, fetchSuccess, updateFailure, updateUser, updateSuccess } from "./adminSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import { makeCall } from "../../api/makeCall";
import { APIRoutes } from "../../api/APIRoutes";
import type { APIConfig } from "../../api/types";
import type { User, UpdateUserPayload } from "../../models/user.model";


function* handleFetch() : Generator {
    try {
        const config : APIConfig = { route: APIRoutes.getUsers };
        const res : any = yield call(makeCall, config);
        yield put(fetchSuccess(res.data as User[]))
    }
    catch (error: any) {
        yield put(fetchFailure(error.response?.data?.message || 'Failed to fetch users'));
    }
}

function* handleUpdate(action: PayloadAction<UpdateUserPayload>) : Generator {
    try {
        const config : APIConfig = { route: APIRoutes.editUser, pathParams: { ":id": action.payload._id }, data: action.payload };
        const res : any = yield call(makeCall, config);
        yield put(updateSuccess(res.data as User))
    }
    catch (error: any) {
        yield put(updateFailure(error.response?.data?.message || 'Failed to update User'));
    }
}

function* handleDelete(action: PayloadAction<string>) : Generator {
    try {
        const config : APIConfig = { route: APIRoutes.deleteUser, pathParams: { ":id": action.payload } };
        const res : any = yield call(makeCall, config);
        yield put(deleteSuccess(res.data as User))
    }
    catch (error: any) {
        yield put(deleteFailure(error.response?.data?.message || 'Failed to delete User'));
    }
}

function* watchAdminSagas() {
    yield takeLatest(fetchUsers.type, handleFetch);
    yield takeLatest(updateUser.type, handleUpdate);
    yield takeLatest(deleteUser.type, handleDelete);
}

export default watchAdminSagas;