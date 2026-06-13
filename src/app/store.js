import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/authSlice";

import { authApi } from "../api/authApi";
import { userApi } from "../api/userApi";
import { snippetApi } from "../api/snippetApi";
import { folderApi } from "../api/folderApi";

export const store = configureStore({
    reducer: {
        auth: authReducer,

        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [snippetApi.reducerPath]: snippetApi.reducer,
        [folderApi.reducerPath]: folderApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            userApi.middleware,
            snippetApi.middleware,
            folderApi.middleware
        ),
});