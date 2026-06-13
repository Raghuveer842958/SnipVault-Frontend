import { useEffect, useState } from "react";

import { toast } from "sonner";

import {
    useUpdateFolderMutation,
} from "../api/folderApi";

const EditFolderModal = ({
    folder,
    isOpen,
    onClose,
}) => {

    const [name, setName] =
        useState("");

    const [
        updateFolder,
        { isLoading },
    ] =
        useUpdateFolderMutation();

    useEffect(() => {
        if (folder) {
            setName(folder.name);
        }
    }, [folder]);

    const submitHandler =
        async (e) => {

            e.preventDefault();

            try {

                await updateFolder({
                    id: folder._id,

                    data: {
                        name,
                    },
                }).unwrap();

                toast.success(
                    "Folder updated successfully"
                );

                onClose();

            } catch (error) {

                toast.error(
                    error?.data?.message ||
                    "Failed to update folder"
                );

            }
        };

    if (!isOpen) return null;

    return (
        <dialog className="modal modal-open">

            <div
                className="
        modal-box
        w-11/12
        max-w-lg
      "
            >

                <h3 className="text-xl font-bold mb-5">

                    Rename Folder

                </h3>

                <form
                    onSubmit={submitHandler}
                    className="space-y-4"
                >

                    <input
                        type="text"
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
                            Save
                        </button>

                    </div>

                </form>

            </div>

        </dialog>
    );
};

export default EditFolderModal;