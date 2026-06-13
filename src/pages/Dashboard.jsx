import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import { useGetDashboardDataQuery } from "../api/userApi";

const StatCard = ({ title, value, icon }) => {
    return (
        <div
            className="
      bg-base-100
      rounded-2xl
      border
      border-base-300
      p-6
      hover:shadow-lg
      transition-all
      duration-300
    "
        >
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm opacity-70">{title}</p>

                    <h2 className="text-4xl font-bold mt-3">
                        {value}
                    </h2>
                </div>

                <div className="text-4xl">{icon}</div>
            </div>
        </div>
    );
};

const Dashboard = () => {
    const { user } = useSelector(
        (state) => state.auth
    );

    const {
        data,
        isLoading,
        isError,
    } = useGetDashboardDataQuery();

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
                    Failed to load dashboard data.
                </div>
            </MainLayout>
        );
    }

    const dashboard = data?.dashboard;

    return (
        <MainLayout>
            {/* Welcome Section */}

            <div className="mb-10">
                <h1 className="text-4xl font-bold mb-2">
                    Welcome back, {user?.name} 👋
                </h1>

                <p className="text-base-content/70">
                    Manage, organize and discover reusable code snippets.
                </p>
            </div>

            {/* Stats */}

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
                <StatCard
                    title="Total Snippets"
                    value={dashboard?.totalSnippets || 0}
                    icon="📄"
                />

                <StatCard
                    title="Total Likes"
                    value={dashboard?.totalLikesReceived || 0}
                    icon="❤️"
                />

                <StatCard
                    title="Folders"
                    value={dashboard?.totalFolders || 0}
                    icon="📂"
                />
            </div>

            {/* Bottom Section */}

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent Snippets */}

                <div
                    className="
          lg:col-span-2
          bg-base-100
          rounded-2xl
          border
          border-base-300
          p-6
        "
                >
                    <h2 className="font-semibold text-xl mb-5">
                        Recent Snippets
                    </h2>

                    {dashboard?.recentSnippets?.length ===
                        0 ? (
                        <div className="text-center py-12 opacity-60">
                            No snippets created yet.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {dashboard?.recentSnippets?.map(
                                (snippet) => (
                                    <div
                                        key={snippet._id}
                                        className="
                    border
                    border-base-300
                    rounded-xl
                    p-4
                    hover:bg-base-200
                    transition-all
                  "
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="font-semibold text-lg">
                                                    {snippet.title}
                                                </h3>

                                                <p className="text-sm opacity-70 mt-1">
                                                    {
                                                        snippet.language
                                                    }
                                                </p>
                                            </div>

                                            <div className="badge badge-primary">
                                                {
                                                    snippet.visibility
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </div>

                {/* Quick Actions */}

                <div
                    className="
          bg-base-100
          rounded-2xl
          border
          border-base-300
          p-6
        "
                >
                    <h2 className="font-semibold text-xl mb-5">
                        Quick Actions
                    </h2>

                    <div className="space-y-4">
                        <Link
                            to="/snippets"
                            className="btn btn-primary w-full"
                        >
                            Create Snippet
                        </Link>

                        <Link
                            to="/folders"
                            className="btn btn-outline w-full"
                        >
                            Create Folder
                        </Link>

                        <Link
                            to="/explore"
                            className="btn btn-outline w-full"
                        >
                            Explore Snippets
                        </Link>
                    </div>

                    <div className="divider"></div>

                    <div>
                        <h3 className="font-medium mb-2">
                            Profile
                        </h3>

                        <p className="text-sm opacity-70">
                            {user?.email}
                        </p>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Dashboard;