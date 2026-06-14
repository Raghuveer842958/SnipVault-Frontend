import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Prism from "prismjs";
import { toast } from "sonner";

import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-python";
import "prismjs/components/prism-json";
import "prismjs/components/prism-css";

import MainLayout from "../layouts/MainLayout";

import {
    useGetPublicSnippetByIdQuery,
} from "../api/snippetApi";

import {
    useToggleLikeMutation,
} from "../api/snippetApi";

import {
    useGetCommentsQuery,
    useCreateCommentMutation,
    useDeleteCommentMutation,
} from "../api/commentApi";

const SnippetDetail = () => {

    const { id } = useParams();

    const {
        data,
        isLoading,
        isError,
    } =
        useGetPublicSnippetByIdQuery(id);

    const [toggleLike,
        {
            isLoading: likeLoading,
        },
    ] =
        useToggleLikeMutation();

    const [comment,
        setComment] =
        useState("");

    const {
        data: commentsData,
    } =
        useGetCommentsQuery(id);

    const [
        createComment,
    ] =
        useCreateCommentMutation();

    const [
        deleteComment,
    ] =
        useDeleteCommentMutation();

    const comments =
        commentsData?.comments || [];

    const snippet =
        data?.snippet;

    useEffect(() => {
        Prism.highlightAll();
    }, [data]);

    const languageMap = {
        JavaScript: "javascript",
        React: "jsx",
        Python: "python",
        JSON: "json",
        CSS: "css",
    };

    const prismLanguage =
        languageMap[snippet?.language] ||
        "javascript";

    const copyHandler = async () => {

        await navigator.clipboard.writeText(
            snippet.code
        );

        toast.success(
            "Code copied successfully"
        );
    };

    const likeHandler = async () => {

        try {

            await toggleLike(
                snippet._id
            ).unwrap();

        } catch (error) {

            toast.error(
                error?.data?.message ||
                "Failed to like snippet"
            );

        }
    };

    const commentHandler = async () => {

        if (!comment.trim())
            return;

        try {

            await createComment({
                snippetId: id,
                text: comment,
            }).unwrap();

            setComment("");

            toast.success(
                "Comment added"
            );

        } catch (error) {

            toast.error(
                error?.data?.message
            );

        }
    };


    if (isLoading) {
        return (
            <MainLayout>
                <div className="flex justify-center py-20">

                    <span className="loading loading-spinner loading-lg"></span>

                </div>
            </MainLayout>
        );
    }

    if (isError) {
        return (
            <MainLayout>

                <div className="alert alert-error">

                    Failed to load snippet

                </div>

            </MainLayout>
        );
    }

    return (
        <MainLayout>

            <div
                className="
                max-w-5xl
                mx-auto
            "
            >

                {/* Header */}

                <div
                    className="
                    bg-base-100
                    border
                    border-base-300
                    rounded-2xl
                    p-6
                    mb-6
                "
                >

                    <h1 className="text-3xl font-bold">

                        {snippet.title}

                    </h1>

                    <p className="opacity-70 mt-2">

                        By {
                            snippet.createdBy?.name
                        }

                    </p>

                    <div className="mt-4 flex gap-2">

                        <span className="badge badge-primary">

                            {snippet.language}

                        </span>

                        <span
                            className="
                            badge
                            badge-outline
                        "
                        >
                            ❤️ {
                                snippet.likes?.length || 0
                            }
                        </span>

                    </div>

                </div>

                {/* Description */}

                {snippet.description && (

                    <div
                        className="
                        bg-base-100
                        border
                        border-base-300
                        rounded-2xl
                        p-6
                        mb-6
                    "
                    >

                        <h2
                            className="
                            font-semibold
                            text-xl
                            mb-3
                        "
                        >
                            Description
                        </h2>

                        <p>
                            {
                                snippet.description
                            }
                        </p>

                    </div>

                )}

                {/* Tags */}

                {snippet.tags?.length > 0 && (

                    <div
                        className="
                        bg-base-100
                        border
                        border-base-300
                        rounded-2xl
                        p-6
                        mb-6
                    "
                    >

                        <h2
                            className="
                            font-semibold
                            text-xl
                            mb-3
                        "
                        >
                            Tags
                        </h2>

                        <div className="flex flex-wrap gap-2">

                            {snippet.tags.map(
                                (tag) => (
                                    <span
                                        key={tag}
                                        className="
                                        badge
                                        badge-outline
                                    "
                                    >
                                        #{tag}
                                    </span>
                                )
                            )}

                        </div>

                    </div>

                )}

                {/* Code */}

                <div
                    className="
                    bg-base-100
                    border
                    border-base-300
                    rounded-2xl
                    p-6
                "
                >

                    <h2
                        className="
                        font-semibold
                        text-xl
                        mb-3
                    "
                    >
                        Code
                    </h2>

                    {/* <pre
                        className="
                        bg-base-200
                        rounded-xl
                        p-4
                        overflow-x-auto
                    "
                    >
                        <code>

                            {snippet.code}

                        </code>
                    </pre> */}

                    <div
                        className="
    flex
    justify-between
    items-center
    mb-4
"
                    >

                        <h2
                            className="
        font-semibold
        text-xl
    "
                        >
                            Code
                        </h2>

                        <button
                            className="
        btn
        btn-sm
        btn-primary
    "
                            onClick={copyHandler}
                        >
                            Copy
                        </button>

                    </div>

                    <pre
                        className="
    rounded-xl
    overflow-x-auto
"
                    >
                        <code
                            className={`language-${prismLanguage}`}
                        >
                            {snippet.code}
                        </code>
                    </pre>

                </div>

                <div
                    className="
    bg-base-100
    border
    border-base-300
    rounded-2xl
    p-6
    mt-6
"
                >

                    <h2
                        className="
        text-xl
        font-semibold
        mb-6
    "
                    >
                        Comments
                    </h2>

                    {/* Create Comment */}

                    <div className="mb-6">

                        <textarea
                            className="
            textarea
            textarea-bordered
            w-full
        "
                            rows="3"
                            placeholder="Write a comment..."
                            value={comment}
                            onChange={(e) =>
                                setComment(
                                    e.target.value
                                )
                            }
                        />

                        <button
                            className="
            btn
            btn-primary
            mt-3
        "
                            onClick={
                                commentHandler
                            }
                        >
                            Post Comment
                        </button>

                    </div>

                    {/* Comments List */}

                    <div className="space-y-4">

                        {comments.length === 0 ? (

                            <p className="opacity-70">

                                No comments yet.

                            </p>

                        ) : (

                            comments.map(
                                (comment) => (

                                    <div
                                        key={
                                            comment._id
                                        }
                                        className="
                        border
                        border-base-300
                        rounded-xl
                        p-4
                    "
                                    >

                                        <div
                                            className="
                            flex
                            justify-between
                            mb-2
                        "
                                        >

                                            <strong>

                                                {
                                                    comment
                                                        .createdBy
                                                        ?.name
                                                }

                                            </strong>

                                            <button
                                                className="
                                btn
                                btn-xs
                                btn-error
                            "
                                                onClick={() =>
                                                    deleteComment(
                                                        comment._id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>

                                        </div>

                                        <p>

                                            {
                                                comment.content
                                            }

                                        </p>

                                    </div>
                                )
                            )

                        )}

                    </div>

                </div>

                <div
                    className="
    bg-base-100
    border
    border-base-300
    rounded-2xl
    p-6
    mb-6
"
                >

                    <button
                        className="
        btn
        btn-primary
    "
                        disabled={likeLoading}
                        onClick={likeHandler}
                    >
                        ❤️
                        {snippet.likes?.length || 0}
                        {" "}
                        Likes
                    </button>

                </div>

            </div>

        </MainLayout>
    );
};

export default SnippetDetail;