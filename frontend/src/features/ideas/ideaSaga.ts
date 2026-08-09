import { call, put, takeLatest } from "redux-saga/effects";
import { createFailure, createIdea, createSuccess, deleteFailure, deleteIdea, deleteSuccess, fetchFailure, fetchIdeas, fetchSuccess, updateFailure, updateIdea, updateSuccess } from "./ideaSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import { makeCall } from "../../api/makeCall";
import { APIRoutes } from "../../api/APIRoutes";
import type { APIConfig } from "../../api/types";
import type { CreateIdeaPayload, Idea, UpdateIdeaPayload } from "../../models/idea.model";


function* handleFetch() : Generator {
    try {
        const config : APIConfig = { route: APIRoutes.getIdeas };
        const res : any = yield call(makeCall, config);
        yield put(fetchSuccess(res.data as Idea[]))
    }
    catch (error: any) {
        yield put(fetchFailure(error.response?.data?.message || 'Failed to fetch ideas'));
    }
}

function* handleCreate(action: PayloadAction<CreateIdeaPayload>) : Generator {
    try {
        const config : APIConfig = { route: APIRoutes.createIdea, data: action.payload };
        const res : any = yield call(makeCall, config);
        yield put(createSuccess(res.data as Idea))
    }
    catch (error: any) {
        yield put(createFailure(error.response?.data?.message || 'Failed to create idea'));
    }
}

function* handleUpdate(action: PayloadAction<UpdateIdeaPayload>) : Generator {
    try {
        const config : APIConfig = { route: APIRoutes.updateIdea, pathParams: { ":id": action.payload._id }, data: action.payload };
        const res : any = yield call(makeCall, config);
        yield put(updateSuccess(res.data as Idea))
    }
    catch (error: any) {
        yield put(updateFailure(error.response?.data?.message || 'Failed to update idea'));
    }
}

function* handleDelete(action: PayloadAction<string>) : Generator {
    try {
        const config : APIConfig = { route: APIRoutes.deleteIdea, pathParams: { ":id": action.payload } };
        const res : any = yield call(makeCall, config);
        yield put(deleteSuccess(res.data as Idea))
    }
    catch (error: any) {
        yield put(deleteFailure(error.response?.data?.message || 'Failed to delete idea'));
    }
}

function* watchIdeaSagas() {
    yield takeLatest(fetchIdeas.type, handleFetch);
    yield takeLatest(createIdea.type, handleCreate);
    yield takeLatest(updateIdea.type, handleUpdate);
    yield takeLatest(deleteIdea.type, handleDelete);
}

export default watchIdeaSagas;