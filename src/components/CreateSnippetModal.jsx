import { useState } from "react";

import { toast } from "sonner";

import { useCreateSnippetMutation } from "../api/snippetApi";

const CreateSnippetModal = ({
    isOpen,
    onClose,
}) => {
    const [createSnippet, { isLoading }] =
        useCreateSnippetMutation();

    const [formData, setFormData] =
        useState({
            title: "",
            code: "",
            language: "",
            description: "",
            tags: "",
            visibility: "private",
        });

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
            const payload = {
                ...formData,

                tags:
                    formData.tags
                        .split(",")
                        .map((tag) =>
                            tag.trim()
                        )
                        .filter(Boolean),
            };

            const response =
                await createSnippet(
                    payload
                ).unwrap();

            toast.success(
                response.message
            );

            setFormData({
                title: "",
                code: "",
                language: "",
                description: "",
                tags: "",
                visibility: "private",
            });

            onClose();

        } catch (error) {
            toast.error(
                error?.data?.message ||
                "Failed to create snippet"
            );
        }
    };

    if (!isOpen) return null;

    return (
        <dialog
            className="modal modal-open"
        >
            <div
                className=" modal-box w-11/12 max-w-3xl max-h-[90vh] overflow-y-auto"
            >

                <h3 className="text-xl sm:text-2xl font-bold mb-6">
                    Create Snippet
                </h3>

                <form
                    onSubmit={
                        submitHandler
                    }
                    className="space-y-4"
                >

                    <input
                        type="text"
                        name="title"
                        placeholder="Snippet Title"
                        className="input input-bordered input-sm sm:input-md w-full"
                        value={
                            formData.title
                        }
                        onChange={
                            changeHandler
                        }
                    />

                    <input
                        type="text"
                        name="language"
                        placeholder="Language"
                        className="input input-bordered input-sm sm:input-md w-full"
                        value={
                            formData.language
                        }
                        onChange={
                            changeHandler
                        }
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        className="textarea textarea-bordered textarea-sm sm:textarea-md w-full"
                        value={
                            formData.description
                        }
                        onChange={
                            changeHandler
                        }
                    />

                    <textarea
                        name="code"
                        placeholder="Paste your code..."
                        rows={window.innerWidth < 640 ? 5 : 8}
                        className="textarea textarea-bordered textarea-sm sm:textarea-md w-full"
                        value={
                            formData.code
                        }
                        onChange={
                            changeHandler
                        }
                    />

                    <input
                        type="text"
                        name="tags"
                        placeholder="react, javascript, hooks"
                        className="input input-bordered input-sm sm:input-md w-full"
                        value={
                            formData.tags
                        }
                        onChange={
                            changeHandler
                        }
                    />

                    <select
                        name="visibility"
                        className="select select-bordered w-full"
                        value={
                            formData.visibility
                        }
                        onChange={
                            changeHandler
                        }
                    >
                        <option value="private">
                            Private
                        </option>

                        <option value="public">
                            Public
                        </option>
                    </select>

                    <div
                        className=" modal-action flex-col sm:flex-row"
                    >

                        <button
                            type="button"
                            className="btn w-full sm:w-auto"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={
                                isLoading
                            }
                            className="btn btn-primary w-full sm:w-auto"
                        >
                            {isLoading
                                ? "Creating..."
                                : "Create"}
                        </button>

                    </div>

                </form>

            </div>
        </dialog>
    );
};

export default CreateSnippetModal;