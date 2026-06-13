import { useEffect, useState } from "react";

import { toast } from "sonner";

import { useUpdateSnippetMutation } from "../api/snippetApi";

const EditSnippetModal = ({
    snippet,
    isOpen,
    onClose,
}) => {
    const [updateSnippet, { isLoading }] =
        useUpdateSnippetMutation();

    const [formData, setFormData] =
        useState({
            title: "",
            code: "",
            language: "",
            description: "",
            tags: "",
            visibility: "private",
        });

    useEffect(() => {
        if (snippet) {
            setFormData({
                title: snippet.title || "",
                code: snippet.code || "",
                language:
                    snippet.language || "",
                description:
                    snippet.description || "",
                tags:
                    snippet.tags?.join(", ") ||
                    "",
                visibility:
                    snippet.visibility ||
                    "private",
            });
        }
    }, [snippet]);

    const changeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });
    };

    const submitHandler = async (
        e
    ) => {
        e.preventDefault();

        try {
            await updateSnippet({
                id: snippet._id,

                data: {
                    ...formData,

                    tags:
                        formData.tags
                            .split(",")
                            .map((tag) =>
                                tag.trim()
                            )
                            .filter(Boolean),
                },
            }).unwrap();

            toast.success(
                "Snippet updated successfully"
            );

            onClose();

        } catch (error) {
            toast.error(
                error?.data?.message ||
                "Failed to update snippet"
            );
        }
    };

    if (!isOpen) return null;

    return (
        <dialog className="modal modal-open">
            <div className="modal-box max-w-3xl">

                <h3 className="font-bold text-2xl mb-6">
                    Edit Snippet
                </h3>

                <form
                    onSubmit={submitHandler}
                    className="space-y-4"
                >
                    <input
                        type="text"
                        name="title"
                        className="input input-bordered w-full"
                        value={formData.title}
                        onChange={changeHandler}
                    />

                    <input
                        type="text"
                        name="language"
                        className="input input-bordered w-full"
                        value={formData.language}
                        onChange={changeHandler}
                    />

                    <textarea
                        name="description"
                        className="textarea textarea-bordered w-full"
                        value={
                            formData.description
                        }
                        onChange={changeHandler}
                    />

                    <textarea
                        rows="8"
                        name="code"
                        className="textarea textarea-bordered w-full font-mono"
                        value={formData.code}
                        onChange={changeHandler}
                    />

                    <input
                        type="text"
                        name="tags"
                        className="input input-bordered w-full"
                        value={formData.tags}
                        onChange={changeHandler}
                    />

                    <select
                        name="visibility"
                        className="select select-bordered w-full"
                        value={
                            formData.visibility
                        }
                        onChange={changeHandler}
                    >
                        <option value="private">
                            Private
                        </option>

                        <option value="public">
                            Public
                        </option>
                    </select>

                    <div className="modal-action">

                        <button
                            type="button"
                            className="btn"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isLoading}
                        >
                            Save Changes
                        </button>

                    </div>
                </form>

            </div>
        </dialog>
    );
};

export default EditSnippetModal;