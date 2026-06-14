import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import {
    useGetExploreSnippetsQuery,
} from "../api/snippetApi";

import SnippetCard from "../components/SnippetCard";

const Explore = () => {

    const navigate = useNavigate()

    const [search, setSearch] =
        useState("");

    const [language, setLanguage] =
        useState("");

    const [sort, setSort] =
        useState("newest");

    const [page, setPage] =
        useState(1);

    const {
        data,
        isLoading,
    } =
        useGetExploreSnippetsQuery({
            search,
            language,
            sort,
            page,
        });

    useEffect(() => {
        setPage(1);
    }, [search, language, sort]);

    useEffect(() => {

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    }, [page]);

    if (isLoading) {
        return (
            <MainLayout>
                <div className="flex justify-center py-20">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            </MainLayout>
        );
    }

    const snippets =
        data?.snippets || [];

    console.log("data is :", data)

    const currentPage =
        data?.currentPage || 1;

    const totalPages =
        data?.totalPages || 1;

    console.log("tatal pages are :", totalPages)

    return (
        <MainLayout>

            <div className="mb-10">

                {/* Header */}

                <div className="mb-8">

                    <h1 className="text-3xl sm:text-4xl font-bold">
                        Explore Snippets
                    </h1>

                    <p className="text-base-content/70 mt-3 max-w-2xl">
                        Discover public snippets shared by developers,
                        learn new patterns, and find reusable code.
                    </p>

                </div>

                {/* Filters */}

                <div
                    className="
  flex
  flex-col
  lg:flex-row
  gap-4
  mb-8
"
                >

                    <input
                        type="text"
                        placeholder="Search snippets..."
                        className="
    input
    input-bordered
    flex-1
  "
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />

                    <select
                        className="
    select
    select-bordered
    w-full
    lg:w-52
  "
                        value={language}
                        onChange={(e) =>
                            setLanguage(
                                e.target.value
                            )
                        }
                    >
                        <option value="">
                            All Languages
                        </option>

                        <option value="JavaScript">
                            JavaScript
                        </option>

                        <option value="React">
                            React
                        </option>

                        <option value="Node.js">
                            Node.js
                        </option>

                        <option value="Python">
                            Python
                        </option>
                    </select>

                    <select
                        className="
    select
    select-bordered
    w-full
    lg:w-52
  "
                        value={sort}
                        onChange={(e) =>
                            setSort(
                                e.target.value
                            )
                        }
                    >
                        <option value="newest">
                            Newest
                        </option>

                        <option value="likes">
                            Most Liked
                        </option>
                    </select>

                </div>

            </div>

            {snippets.length === 0 ? (
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
                    No snippets found.
                </div>
            ) : (
                <div
                    className="
          grid
          xl:grid-cols-2
          gap-6
        "
                >
                    {snippets.map(
                        (snippet) => (
                            <SnippetCard
                                onClick={() =>
                                    navigate(
                                        `/snippets/${snippet._id}`
                                    )
                                }
                                key={snippet._id}
                                snippet={snippet}
                            />
                        )
                    )}
                </div>
            )}

            {totalPages > 1 && (

                <div
                    className="
    flex
    justify-center
    items-center
    gap-2
    mt-10
  "
                >

                    <button
                        className="btn btn-outline"
                        disabled={currentPage === 1}
                        onClick={() =>
                            setPage((prev) =>
                                prev - 1
                            )
                        }
                    >
                        Prev
                    </button>

                    <span
                        className="
      px-4
      py-2
      font-medium
    "
                    >
                        Page {currentPage}
                        {" "}
                        of
                        {" "}
                        {totalPages}
                    </span>

                    <button
                        className="btn btn-outline"
                        disabled={
                            currentPage === totalPages
                        }
                        onClick={() =>
                            setPage((prev) =>
                                prev + 1
                            )
                        }
                    >
                        Next
                    </button>

                </div>

            )}

        </MainLayout>
    );
};

export default Explore;