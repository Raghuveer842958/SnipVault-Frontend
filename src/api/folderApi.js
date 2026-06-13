import {
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../utils/constants";

export const folderApi = createApi({
    reducerPath: "folderApi",

    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: "include",
    }),

    tagTypes: ["Folder"],

    endpoints: (builder) => ({
        getFolders: builder.query({
            query: () => "/folders",

            providesTags: ["Folder"],
        }),

        createFolder: builder.mutation({
            query: (data) => ({
                url: "/folders",
                method: "POST",
                body: data,
            }),

            invalidatesTags: ["Folder"],
        }),

        updateFolder: builder.mutation({
            query: ({ id, data }) => ({
                url: `/folders/${id}`,
                method: "PUT",
                body: data,
            }),

            invalidatesTags: ["Folder"],
        }),

        deleteFolder: builder.mutation({
            query: (id) => ({
                url: `/folders/${id}`,
                method: "DELETE",
            }),

            invalidatesTags: ["Folder"],
        }),

        getFolderSnippets: builder.query({
            query: (id) => `/folders/${id}/snippets`,
            providesTags: ["Folder"],
        }),
    }),
});

export const {
    useGetFoldersQuery,
    useCreateFolderMutation,
    useUpdateFolderMutation,
    useDeleteFolderMutation,
    useGetFolderSnippetsQuery,
} = folderApi;