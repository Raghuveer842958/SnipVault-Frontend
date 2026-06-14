import MainLayout from "../layouts/MainLayout";
import FolderCard from "../components/FolderCard";
import { useState } from "react";
import CreateFolderModal from "../components/CreateFolderModal";

import {
    useGetFoldersQuery,
} from "../api/folderApi";

import { toast } from "sonner";

import EditFolderModal from "../components/EditFolderModal";
import { useDeleteFolderMutation } from "../api/folderApi";

import FolderDetailsModal from "../components/FolderDetailsModal";

const Folders = () => {

    const [openModal, setOpenModal] = useState(false);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [deleteFolder] = useDeleteFolderMutation();
    const [selectedFolderForView, setSelectedFolderForView,] = useState(null);
    const [openFolderModal, setOpenFolderModal,] = useState(false);
    const [folderHistory, setFolderHistory,] = useState([]);

    const {
        data,
        isLoading,
        isError,
    } =
        useGetFoldersQuery();

    console.log("data is :", data)

    const editHandler = (
        folder
    ) => {

        setSelectedFolder(
            folder
        );

        setOpenEditModal(
            true
        );
    };

    const deleteHandler = async (id) => {

        const confirmed =
            window.confirm(
                "Delete this folder?"
            );

        if (!confirmed) return;

        try {

            await deleteFolder(
                id
            ).unwrap();

            toast.success(
                "Folder deleted successfully"
            );

        } catch (error) {

            toast.error(
                error?.data?.message ||
                "Failed to delete folder"
            );

        }
    };

    const openHandler = (folder) => {

        setFolderHistory([
            folder
        ]);

        setSelectedFolderForView(
            folder
        );

        setOpenFolderModal(
            true
        );
    };

    if (isLoading) {
        return (
            <MainLayout>
                <div className="flex justify-center items-center h-[70vh]">

                    <span className="loading loading-spinner loading-lg"></span>

                </div>
            </MainLayout>
        );
    }

    if (isError) {
        return (
            <MainLayout>

                <div className="alert alert-error">

                    Failed to load folders

                </div>

            </MainLayout>
        );
    }

    const folders =
        data?.folders || [];

    return (
        <MainLayout>

            {/* Header */}

            <div
                className="
        flex
        flex-col
        sm:flex-row
        sm:justify-between
        sm:items-center
        gap-4
        mb-8
      "
            >

                <div>

                    <h1 className="text-3xl sm:text-4xl font-bold">

                        Folders

                    </h1>

                    <p className="text-base-content/70 mt-2">

                        Organize your snippets.

                    </p>

                </div>

                <button
                    className=" btn btn-primary w-full sm:w-auto"
                    onClick={() =>
                        setOpenModal(true)
                    }
                >
                    + New Folder
                </button>

            </div>

            {/* Empty State */}

            {folders.length === 0 ? (

                <div
                    className="
          bg-base-100
          border
          border-base-300
          rounded-2xl
          p-12
          text-center
        "
                >

                    <h2 className="text-2xl font-semibold">

                        No folders yet

                    </h2>

                    <p className="opacity-70 mt-2">

                        Create your first folder.

                    </p>

                </div>

            ) : (

                <div
                    className="
          grid
          md:grid-cols-2
          xl:grid-cols-3
          gap-6
        "
                >

                    {folders.map(
                        (folder) => (
                            <FolderCard
                                key={folder._id}
                                folder={folder}
                                onEdit={editHandler}
                                onDelete={deleteHandler}
                                onOpen={openHandler}
                            />
                        )
                    )}

                </div>

            )}

            <CreateFolderModal
                isOpen={openModal}
                onClose={() =>
                    setOpenModal(false)
                }
            />

            <EditFolderModal
                folder={selectedFolder}
                isOpen={openEditModal}
                onClose={() =>
                    setOpenEditModal(false)
                }
            />

            <FolderDetailsModal
                folder={selectedFolderForView}
                isOpen={openFolderModal}
                onClose={() =>
                    setOpenFolderModal(false)
                }
                setSelectedFolderForView={
                    setSelectedFolderForView
                }
                folderHistory={
                    folderHistory
                }
                setFolderHistory={
                    setFolderHistory
                }
            />

        </MainLayout>
    );
};

export default Folders;