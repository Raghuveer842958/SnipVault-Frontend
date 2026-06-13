import {
    useGetFolderSnippetsQuery,
} from "../api/folderApi";

const FolderDetailsModal = ({ folder, isOpen, onClose, setSelectedFolderForView, folderHistory, setFolderHistory, }) => {

    const {
        data,
        isLoading,
    } =
        useGetFolderSnippetsQuery(
            folder?._id,
            {
                skip: !folder,
            }
        );

    if (!isOpen) return null;

    const snippets =
        data?.snippets || [];

    const childFolders =
        data?.childFolders || [];

    console.log(data);

    return (
        <dialog className="modal modal-open">
            <div
                className="
      modal-box
      w-11/12
      max-w-4xl
      max-h-[90vh]
      overflow-y-auto
    "
            >
                {folderHistory.length > 1 && (
                    <button
                        className="
    btn
    btn-sm
    btn-outline
    mb-4
  "
                        onClick={() => {

                            const updatedHistory =
                                folderHistory.slice(
                                    0,
                                    -1
                                );

                            setFolderHistory(
                                updatedHistory
                            );

                            setSelectedFolderForView(
                                updatedHistory[
                                updatedHistory.length - 1
                                ]
                            );
                        }}
                    >
                        ← Back
                    </button>
                )}

                <div className="text-sm opacity-70 mb-4">

                    {folderHistory
                        .map(
                            (folder) =>
                                folder.name
                        )
                        .join(" > ")}

                </div>
                <h3 className="text-2xl font-bold mb-2">
                    📁 {folder?.name}
                </h3>

                <p className="opacity-70 mb-6">
                    Folder contents
                </p>

                {isLoading ? (
                    <div className="flex justify-center py-10">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : (
                    <>
                        {/* SUBFOLDERS */}

                        <div className="mb-8">
                            <h4 className="font-semibold text-lg mb-4">
                                Subfolders
                            </h4>

                            {childFolders.length === 0 ? (
                                <div className="opacity-60">
                                    No subfolders found.
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {childFolders.map((childFolder) => (
                                        <button
                                            key={childFolder._id}
                                            onClick={() => {

                                                setFolderHistory(
                                                    [
                                                        ...folderHistory,
                                                        childFolder,
                                                    ]
                                                );

                                                setSelectedFolderForView(
                                                    childFolder
                                                );
                                            }}
                                            className="
  w-full
  text-left
  border
  border-base-300
  rounded-xl
  p-4
  flex
  items-center
  gap-3
  hover:bg-base-200
  transition-all
"
                                        >
                                            <span className="text-xl">
                                                📁
                                            </span>

                                            <span className="font-medium">
                                                {childFolder.name}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="divider">
                            Snippets
                        </div>

                        {/* SNIPPETS */}

                        {snippets.length === 0 ? (
                            <div className="text-center py-10 opacity-70">
                                No snippets found.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {snippets.map((snippet) => (
                                    <div
                                        key={snippet._id}
                                        className="
                  border
                  border-base-300
                  rounded-xl
                  p-4
                "
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-semibold text-lg">
                                                    {snippet.title}
                                                </h4>

                                                <p className="text-sm opacity-70">
                                                    {snippet.language}
                                                </p>
                                            </div>

                                            <div
                                                className={`
                        badge
                        ${snippet.visibility === "public"
                                                        ? "badge-success"
                                                        : "badge-neutral"
                                                    }
                      `}
                                            >
                                                {snippet.visibility}
                                            </div>
                                        </div>

                                        {snippet.description && (
                                            <p className="mt-3 opacity-80">
                                                {snippet.description}
                                            </p>
                                        )}

                                        {snippet.tags?.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {snippet.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="
                          badge
                          badge-outline
                        "
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                <div className="modal-action">
                    <button
                        className="btn"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default FolderDetailsModal;