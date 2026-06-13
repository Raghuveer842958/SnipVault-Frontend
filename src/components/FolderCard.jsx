const FolderCard = ({
    folder,
    onEdit,
    onDelete,
    onOpen,
}) => {
    return (
        <div
            className="
      bg-base-100
      border
      border-base-300
      rounded-2xl
      p-6
      hover:shadow-lg
      transition-all
      duration-300
    "
        >

            <div>

                <h2 className="text-xl font-bold">
                    📁 {folder.name}
                </h2>

                {folder.parentFolder && (
                    <p className="text-sm opacity-70 mt-2">

                        Parent:{" "}
                        {
                            folder.parentFolder
                                .name
                        }

                    </p>
                )}

            </div>

            <p className="text-sm opacity-70 mt-4">

                {folder.snippets?.length || 0}
                {" "}
                snippets

            </p>

            <div className="flex gap-2 mt-6">

                <button
                    className="
          btn
          btn-sm
          btn-primary
        "
                    onClick={() =>
                        onOpen(folder)
                    }
                >
                    Open
                </button>

                <button
                    className="
          btn
          btn-sm
          btn-outline
        "
                    onClick={() =>
                        onEdit(folder)
                    }
                >
                    Rename
                </button>

                <button
                    className="
          btn
          btn-sm
          btn-error
          btn-outline
        "
                    onClick={() =>
                        onDelete(folder._id)
                    }
                >
                    Delete
                </button>

            </div>

        </div>
    );
};

export default FolderCard;