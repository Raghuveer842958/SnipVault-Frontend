import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SnippetCard = ({ snippet, onEdit, onDelete, onMove }) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/snippets/${snippet._id}`)}>
            {/* <Link
            to={`/snippets/${snippet._id}`}
        > */}
            <div
                className="
      bg-base-100
      border
      border-base-300
      rounded-2xl
      p-6
      hover:shadow-xl
      transition-all
      duration-300
      cursor-pointer
    "
            >
                {/* Header */}

                <div className="flex justify-between items-start mb-4">

                    <div>

                        <h2 className="text-xl font-bold">
                            {snippet.title}
                        </h2>

                        <p className="text-sm opacity-70 mt-1">
                            {snippet.language}
                        </p>

                    </div>

                    <div
                        className={`
          badge
          ${snippet.visibility ===
                                "public"
                                ? "badge-success"
                                : "badge-neutral"
                            }
        `}
                    >
                        {snippet.visibility}
                    </div>

                </div>

                {/* Description */}

                <div className="min-h-[60px]">

                    <p className="text-base-content/70 text-sm">

                        {snippet.description ||
                            "No description provided."}

                    </p>

                </div>

                <div className="min-h-[60px]">

                    <p className="text-base-content/70 text-sm">

                        {snippet.description ||
                            "No description provided."}

                    </p>

                </div>

                {snippet.code && (

                    <div
                        className="
            mt-4
            bg-base-200
            border
            border-base-300
            rounded-xl
            p-3
            overflow-hidden
        "
                    >

                        <pre
                            className="
                text-xs
                sm:text-sm
                whitespace-pre-wrap
                break-words
                line-clamp-3
            "
                        >

                            {
                                snippet.code
                                    .split("\n")
                                    .slice(0, 3)
                                    .join("\n")
                            }

                        </pre>

                    </div>

                )}

                {/* Tags */}

                <div className="flex flex-wrap gap-2 mt-5">

                    {snippet.tags?.map(
                        (tag) => (
                            <span
                                key={tag}
                                className="
                badge
                badge-outline
              "
                            >
                                #{tag}
                            </span>
                        )
                    )}

                </div>

                {/* Footer */}

                <div
                    className="
        mt-6
        flex
        flex-col
        lg:flex-row
        gap-4
        lg:items-center
        lg:justify-between
    "
                >

                    <div className="flex items-center gap-4">

                        <span className="text-sm opacity-70">
                            ❤️{" "}
                            {
                                snippet.likes
                                    ?.length
                            }
                        </span>

                        {snippet.createdBy?.name && (
                            <p className="text-sm opacity-60">
                                By {snippet.createdBy.name}
                            </p>
                        )}

                    </div>

                    <div
                        className="
        flex
        flex-wrap
        gap-2
    "
                    >
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit(snippet);
                            }}
                            className="btn btn-sm btn-outline"
                        >
                            Edit
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(snippet._id)
                            }}
                            className="
  btn
  btn-sm
  btn-error
  btn-outline
"
                        >
                            Delete
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log("Move clicked");
                                onMove(snippet);
                            }}
                            className="btn btn-sm btn-outline"
                        >
                            Move
                        </button>
                    </div>

                </div>
            </div>
            {/* </Link> */}
        </div>
    );
};

export default SnippetCard;