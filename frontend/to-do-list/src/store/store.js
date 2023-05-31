import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { AuthApi } from "../api/AuthApi";
import { TodoApi } from "../api/TodoApi";
import { authReducer } from "../slices/AuthSlice";

const rootReducer = combineReducers({
    [AuthApi.reducerPath]: AuthApi.reducer,
    [TodoApi.reducerPath]: TodoApi.reducer,
    auth: authReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(AuthApi.middleware)
            .concat(TodoApi.middleware)
})

export default store;
