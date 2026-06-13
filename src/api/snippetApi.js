import {
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../utils/constants";

export const snippetApi = createApi({
    reducerPath: "snippetApi",

    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: "include",
    }),

    tagTypes: ["Snippet"],

    endpoints: (builder) => ({
        getAllSnippets: builder.query({
            query: () => "/snippets",

            providesTags: ["Snippet"],
        }),

        createSnippet: builder.mutation({
            query: (data) => ({
                url: "/snippets",
                method: "POST",
                body: data,
            }),

            invalidatesTags: ["Snippet"],
        }),

        updateSnippet: builder.mutation({
            query: ({ id, data }) => ({
                url: `/snippets/${id}`,
                method: "PUT",
                body: data,
            }),

            invalidatesTags: ["Snippet"],
        }),

        deleteSnippet: builder.mutation({
            query: (id) => ({
                url: `/snippets/${id}`,
                method: "DELETE",
            }),

            invalidatesTags: ["Snippet"],
        }),

        moveSnippet: builder.mutation({
            query: ({ id, folderId }) => ({
                url: `/snippets/${id}/move`,
                method: "PUT",
                body: {
                    folderId,
                },
            }),

            invalidatesTags: [
                "Snippet",
            ],
        }),
    }),
});

export const {
    useGetAllSnippetsQuery,
    useCreateSnippetMutation,
    useUpdateSnippetMutation,
    useDeleteSnippetMutation,
    useMoveSnippetMutation
} = snippetApi;