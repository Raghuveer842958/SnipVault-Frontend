import {
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../utils/constants";

export const userApi = createApi({
    reducerPath: "userApi",

    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: "include",
    }),

    endpoints: (builder) => ({
        getDashboardData:
            builder.query({
                query: () =>
                    "/users/dashboard",
            }),

        updateProfile: builder.mutation({
            query: (data) => ({
                url: "/users/profile",
                method: "PUT",
                body: data,
            }),
        }),
    }),
});

export const {
    useGetDashboardDataQuery,
    useUpdateProfileMutation,
} = userApi;