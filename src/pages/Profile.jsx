import { useState, useEffect } from "react";

import MainLayout from "../layouts/MainLayout";

import {
    useGetDashboardDataQuery,
    useUpdateProfileMutation,
} from "../api/userApi";;

import { toast } from "sonner";

import {
    useSelector, useDispatch
} from "react-redux";
import { useLogoutUserMutation } from "../api/authApi";
import { useClear } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate= useNavigate()

    const {
        data,
        isLoading,
    } = useGetDashboardDataQuery();

    const [logout] =
        useLogoutUserMutation();

    const logoutHandler = async () => {

        try {

            const response =
                await logout().unwrap();

            console.log(response);

            dispatch(useClear());

            navigate("/login");

            toast.success(
                "Logged out successfully"
            );

        } catch (error) {

            console.log(error);

            toast.error(
                error?.data?.message ||
                "Logout failed"
            );

        }

    };

    const user = useSelector((state) => state.auth.user);

    const [
        updateProfile,
        {
            isLoading: updating,
        },
    ] = useUpdateProfileMutation();

    const dashboard =
        data?.dashboard;

    const [name, setName] =
        useState("");

    const [avatar, setAvatar] =
        useState("");

    useEffect(() => {

        if (user) {

            setName(
                user.name || ""
            );

            setAvatar(
                user.avatar || ""
            );
        }

    }, [user]);

    console.log("data is", data);

    const submitHandler = async (e) => {

        e.preventDefault();

        try {

            await updateProfile({
                name,
                avatar,
            }).unwrap();

            toast.success(
                "Profile updated"
            );

        } catch (error) {

            toast.error(
                error?.data?.message
            );

        }
    };

    if (isLoading) {
        return (
            <MainLayout>

                <div className="flex justify-center py-20">

                    <span className="loading loading-spinner loading-lg"></span>

                </div>

            </MainLayout>
        );
    }

    return (
        <MainLayout>

            <div className="max-w-5xl mx-auto">

                {/* Header Card */}

                {/* <div
                    className="
                bg-base-100
                border
                border-base-300
                rounded-2xl
                p-6
                mb-8
            "
                >

                    <div className="flex items-center gap-5">

                        <div
                            className="
                        w-16
                        h-16
                        rounded-full
                        bg-primary
                        text-primary-content
                        flex
                        items-center
                        justify-center
                        text-2xl
                        font-bold
                    "
                        >
                            {user?.name?.charAt(0)?.toUpperCase()}
                        </div>

                        <div>

                            <h1 className="text-3xl font-bold">

                                {user?.name}

                            </h1>

                            <p className="text-base-content/70">

                                {user?.email}

                            </p>

                        </div>

                    </div>

                </div> */}

                <div
                    className="
        bg-base-100
        border
        border-base-300
        rounded-2xl
        p-6
        mb-8
    "
                >

                    <div
                        className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-5
        "
                    >

                        {/* User Info */}

                        <div className="flex items-center gap-5">

                            <div
                                className="
                    w-16
                    h-16
                    rounded-full
                    bg-primary
                    text-primary-content
                    flex
                    items-center
                    justify-center
                    text-2xl
                    font-bold
                    shrink-0
                "
                            >
                                {user?.name?.charAt(0)?.toUpperCase()}
                            </div>

                            <div className="min-w-0">

                                <h1
                                    className="
                        text-2xl
                        sm:text-3xl
                        font-bold
                        break-words
                    "
                                >
                                    {user?.name}
                                </h1>

                                <p
                                    className="
                        text-base-content/70
                        break-all
                    "
                                >
                                    {user?.email}
                                </p>

                            </div>

                        </div>

                        {/* Logout Button */}

                        <button
                            onClick={logoutHandler}
                            className="
                btn
                btn-outline
                btn-error
                w-full
                sm:w-auto
            "
                        >
                            Logout
                        </button>

                    </div>

                </div>

                {/* Stats */}

                <div
                    className="
                grid
                grid-cols-1
                sm:grid-cols-3
                gap-6
                mb-8
            "
                >

                    <div
                        className="
                    stat
                    bg-base-100
                    rounded-2xl
                    border
                    border-base-300
                "
                    >

                        <div className="stat-title">

                            Snippets

                        </div>

                        <div className="stat-value text-primary">

                            {data?.dashboard?.totalSnippets || 0}

                        </div>

                    </div>

                    <div
                        className="
                    stat
                    bg-base-100
                    rounded-2xl
                    border
                    border-base-300
                "
                    >

                        <div className="stat-title">

                            Folders

                        </div>

                        <div className="stat-value text-secondary">

                            {data?.dashboard?.totalFolders || 0}

                        </div>

                    </div>

                    <div
                        className="
                    stat
                    bg-base-100
                    rounded-2xl
                    border
                    border-base-300
                "
                    >

                        <div className="stat-title">

                            Likes Received

                        </div>

                        <div className="stat-value text-accent">

                            {data?.dashboard?.totalLikesReceived || 0}

                        </div>

                    </div>

                </div>

                {/* Recent Snippets */}

                <div
                    className="
                bg-base-100
                border
                border-base-300
                rounded-2xl
                p-6
                mb-8
            "
                >

                    <h2
                        className="
                    text-xl
                    font-semibold
                    mb-5
                "
                    >
                        Recent Snippets
                    </h2>

                    {
                        data?.dashboard?.recentSnippets?.length > 0
                            ? (
                                <div className="space-y-3">

                                    {
                                        data.dashboard.recentSnippets.map(
                                            (snippet) => (
                                                <div
                                                    key={snippet._id}
                                                    className="
                                                flex
                                                justify-between
                                                items-center
                                                border-b
                                                border-base-300
                                                pb-3
                                            "
                                                >

                                                    <span>

                                                        {snippet.title}

                                                    </span>

                                                    <span
                                                        className="
                                                    badge
                                                    badge-outline
                                                "
                                                    >

                                                        {snippet.language}

                                                    </span>

                                                </div>
                                            )
                                        )
                                    }

                                </div>
                            )
                            : (
                                <p className="text-base-content/70">

                                    No snippets created yet.

                                </p>
                            )
                    }

                </div>

                {/* Edit Profile */}

                <div
                    className="
                bg-base-100
                border
                border-base-300
                rounded-2xl
                p-6
            "
                >

                    <h2
                        className="
                    text-xl
                    font-semibold
                    mb-6
                "
                    >
                        Edit Profile
                    </h2>

                    <form
                        onSubmit={submitHandler}
                        className="space-y-4"
                    >

                        <div>

                            <label className="label">

                                <span className="label-text">

                                    Name

                                </span>

                            </label>

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

                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={updating}
                        >
                            {
                                updating
                                    ? "Updating..."
                                    : "Save Changes"
                            }
                        </button>

                    </form>

                </div>

            </div>

        </MainLayout>
    );
};

export default Profile;