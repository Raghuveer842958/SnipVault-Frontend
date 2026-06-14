import { useState } from "react";
import { toast } from "sonner";

import CreateSnippetModal from "../components/CreateSnippetModal";
import MainLayout from "../layouts/MainLayout";
import { useGetAllSnippetsQuery } from "../api/snippetApi";
import SnippetCard from "../components/SnippetCard";

import { useDeleteSnippetMutation } from "../api/snippetApi";
import EditSnippetModal from "../components/EditSnippetModal";
import MoveSnippetModal from "../components/MoveSnippetModal";

const MySnippets = () => {

    const [openModal, setOpenModal] = useState(false);
    const [deleteSnippet] = useDeleteSnippetMutation();
    const [selectedSnippet, setSelectedSnippet] = useState(null);
    const [openEditModal, setOpenEditModal] = useState(false);

    const [openMoveModal, setOpenMoveModal] = useState(false);
    const [selectedSnippetForMove, setSelectedSnippetForMove] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [languageFilter, setLanguageFilter] = useState("all");

    const deleteHandler = async (
        id
    ) => {

        const confirmed =
            window.confirm(
                "Delete this snippet?"
            );

        if (!confirmed) return;

        try {

            await deleteSnippet(
                id
            ).unwrap();

            toast.success(
                "Snippet deleted successfully"
            );

        } catch (error) {

            toast.error(
                error?.data?.message ||
                "Failed to delete snippet"
            );

        }
    };

    const editHandler = (snippet) => {
        console.log("onedit called!!")
        setSelectedSnippet(
            snippet
        );

        setOpenEditModal(
            true
        );
    };

    const moveHandler = (
        snippet
    ) => {

        setSelectedSnippetForMove(
            snippet
        );

        setOpenMoveModal(
            true
        );
    };

    const {
        data,
        isLoading,
        isError,
    } = useGetAllSnippetsQuery();

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
                    Failed to load snippets
                </div>
            </MainLayout>
        );
    }

    const snippets =
        data?.snippets || [];

    const languages = [
        "all",

        ...new Set(
            snippets.map(
                (snippet) =>
                    snippet.language
            )
        ),
    ];

    const filteredSnippets =
        snippets.filter(
            (snippet) => {

                const matchesSearch =
                    snippet.title
                        .toLowerCase()
                        .includes(
                            searchTerm.toLowerCase()
                        );

                const matchesLanguage =
                    languageFilter === "all"
                        ? true
                        : snippet.language ===
                        languageFilter;

                return (
                    matchesSearch &&
                    matchesLanguage
                );
            }
        );

    return (
        <MainLayout>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

                <div>

                    <h1 className="text-3xl sm:text-4xl font-bold">
                        My Snippets
                    </h1>

                    <p className="text-base-content/70 mt-2">
                        Manage your saved code snippets.
                    </p>

                </div>

                <button
                    className="btn btn-primary w-full sm:w-auto"
                    onClick={() => setOpenModal(true)}
                >
                    + Create Snippet
                </button>

            </div>

            {filteredSnippets.length === 0 ? (
                <div
                    className=" bg-base-100 border border-base-300 rounded-2xl p-12 text-center"
                >
                    <h2 className="text-2xl font-semibold">

                        No matching snippets

                    </h2>

                    <p className="opacity-70 mt-2">

                        Try changing search
                        or filter.

                    </p>

                </div>
            ) : (
                <div className="flex flex-col md:flex-row gap-4 mb-8">

                    <input
                        type="text"
                        placeholder="Search snippets..."
                        className="input input-bordered w-full md:flex-1"
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(
                                e.target.value
                            )
                        }
                    />

                    <select
                        className=" select select-bordered w-full md:w-60"
                        value={
                            languageFilter
                        }
                        onChange={(e) =>
                            setLanguageFilter(
                                e.target.value
                            )
                        }
                    >

                        {languages.map(
                            (language) => (
                                <option
                                    key={language}
                                    value={language}
                                >
                                    {language}
                                </option>
                            )
                        )}

                    </select>

                </div>
            )}

            {snippets.length && <div
                className="
          grid
          xl:grid-cols-2
          gap-6
        ">

                {filteredSnippets.map((snippet) => (
                    <SnippetCard
                        key={snippet._id}
                        snippet={snippet}
                        onEdit={editHandler}
                        onDelete={
                            deleteHandler
                        }
                        onMove={moveHandler}
                    />
                ))}

            </div>}


            <CreateSnippetModal
                isOpen={openModal}
                onClose={() =>
                    setOpenModal(false)
                }
            />

            <EditSnippetModal
                snippet={
                    selectedSnippet
                }
                isOpen={
                    openEditModal
                }
                onClose={() =>
                    setOpenEditModal(
                        false
                    )
                }
            />

            <MoveSnippetModal
                snippet={
                    selectedSnippetForMove
                }
                isOpen={
                    openMoveModal
                }
                onClose={() =>
                    setOpenMoveModal(
                        false
                    )
                }
            />

        </MainLayout>
    );
};

export default MySnippets;