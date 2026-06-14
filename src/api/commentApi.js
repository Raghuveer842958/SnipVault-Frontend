import {
    createApi,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import {
    BASE_URL,
} from "../utils/constants";

export const commentApi = createApi({
    reducerPath: "commentApi",

    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        credentials: "include",
    }),

    tagTypes: ["Comment"],

    endpoints: (builder) => ({

        getComments: builder.query({
            query: (snippetId) =>
                `/comments/${snippetId}`,

            providesTags: ["Comment"],
        }),

        createComment: builder.mutation({
            query: ({
                snippetId,
                text,
            }) => ({
                url: `/comments/${snippetId}`,
                method: "POST",
                body: {
                    text,
                },
            }),

            invalidatesTags: ["Comment"],
        }),

        deleteComment: builder.mutation({
            query: (commentId) => ({
                url: `/comments/${commentId}`,
                method: "DELETE",
            }),

            invalidatesTags: [
                "Comment",
            ],
        }),
    }),
});

export const {
    useGetCommentsQuery,
    useCreateCommentMutation,
    useDeleteCommentMutation,
} = commentApi;