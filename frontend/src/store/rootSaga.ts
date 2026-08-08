import { all, fork } from "redux-saga/effects";
import watchAuthSagas from "../features/auth/authSaga";
import watchIdeaSagas from "../features/ideas/ideaSaga";
import watchAdminSagas from "../features/admin/adminSaga";


export default function* rootSaga() {
    yield all([
        fork(watchAuthSagas),
        fork(watchIdeaSagas),
        fork(watchAdminSagas),
    ]);
}