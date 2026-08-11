import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import rootReducer from './rootReducer';
import { checkSession } from '../features/auth/authSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

// Redux is intentionally in-memory. Rehydrate the auth state from the
// cookie-backed server session every time this JS application starts.
store.dispatch(checkSession());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
