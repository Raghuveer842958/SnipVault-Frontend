import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../utils/constants";

export const authApi = createApi({
    reducerPath: "authApi",

    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,

        credentials: "include",
    }),

    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: "/auth/register",
                method: "POST",
                body: data,
            }),
        }),

        login: builder.mutation({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data,
            }),
        }),

        logoutUser: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
        }),

        getCurrentUser: builder.query({
            query: () => "/auth/me",
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutUserMutation,
    useGetCurrentUserQuery,
} = authApi;