import { useState } from "react";

import { toast } from "sonner";

import {
    useGetFoldersQuery,
} from "../api/folderApi";

import {
    useMoveSnippetMutation,
} from "../api/snippetApi";

const MoveSnippetModal = ({
    snippet,
    isOpen,
    onClose,
}) => {

    const [folderId,
        setFolderId] =
        useState("");

    const {
        data,
    } =
        useGetFoldersQuery();

    const [
        moveSnippet,
        {
            isLoading,
        },
    ] =
        useMoveSnippetMutation();

    const submitHandler =
        async () => {

            try {

                await moveSnippet({
                    id: snippet._id,
                    folderId,
                }).unwrap();

                toast.success(
                    "Snippet moved successfully"
                );

                onClose();

            } catch (error) {

                toast.error(
                    error?.data?.message ||
                    "Failed to move snippet"
                );

            }
        };

    if (!isOpen) return null;

    const folders =
        data?.folders || [];

    return (
        <dialog className="modal modal-open">

            <div className="modal-box">

                <h3 className="font-bold text-xl mb-5">

                    Move Snippet

                </h3>

                <select
                    className="
          select
          select-bordered
          w-full
        "
                    value={folderId}
                    onChange={(e) =>
                        setFolderId(
                            e.target.value
                        )
                    }
                >

                    <option value="">
                        Select Folder
                    </option>

                    {folders.map(
                        (folder) => (
                            <option
                                key={
                                    folder._id
                                }
                                value={
                                    folder._id
                                }
                            >
                                {folder.name}
                            </option>
                        )
                    )}

                </select>

                <div className="modal-action">

                    <button
                        className="btn"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="btn btn-primary"
                        disabled={
                            isLoading ||
                            !folderId
                        }
                        onClick={
                            submitHandler
                        }
                    >
                        Move
                    </button>

                </div>

            </div>

        </dialog>
    );
};

export default MoveSnippetModal;