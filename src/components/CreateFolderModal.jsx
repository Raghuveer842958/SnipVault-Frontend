import { useState } from "react";

import { toast } from "sonner";

import {
    useCreateFolderMutation,
    useGetFoldersQuery,
} from "../api/folderApi";

const CreateFolderModal = ({
    isOpen,
    onClose,
}) => {
    const [name, setName] =
        useState("");

    const [parentFolder,
        setParentFolder] =
        useState("");

    const [createFolder, {
        isLoading,
    }] =
        useCreateFolderMutation();

    const { data } =
        useGetFoldersQuery();

    const folders =
        data?.folders || [];

    const submitHandler =
        async (e) => {

            e.preventDefault();

            try {

                const payload = {
                    name,
                };

                if (parentFolder) {
                    payload.parentFolder =
                        parentFolder;
                }

                await createFolder(
                    payload
                ).unwrap();

                toast.success(
                    "Folder created successfully"
                );

                setName("");
                setParentFolder("");

                onClose();

            } catch (error) {

                toast.error(
                    error?.data?.message ||
                    "Failed to create folder"
                );

            }
        };

    if (!isOpen) return null;

    return (
        <dialog
            className="modal modal-open"
        >
            <div
                className="
        modal-box
        w-11/12
        max-w-lg
      "
            >

                <h3 className="text-xl font-bold mb-6">

                    Create Folder

                </h3>

                <form
                    onSubmit={
                        submitHandler
                    }
                    className="space-y-4"
                >

                    <input
                        type="text"
                        placeholder="Folder Name"
                        className="
            input
            input-bordered
            w-full
          "
                        value={name}
                        onChange={(e) =>
                            setName(
                                e.target.value
                            )
                        }
                    />

                    <select
                        className="
            select
            select-bordered
            w-full
          "
                        value={
                            parentFolder
                        }
                        onChange={(e) =>
                            setParentFolder(
                                e.target.value
                            )
                        }
                    >

                        <option value="">
                            No Parent Folder
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

                    <div
                        className="
            modal-action
            flex-col
            sm:flex-row
          "
                    >

                        <button
                            type="button"
                            className="
              btn
              w-full
              sm:w-auto
            "
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={
                                isLoading
                            }
                            className="
              btn
              btn-primary
              w-full
              sm:w-auto
            "
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

export default CreateFolderModal;