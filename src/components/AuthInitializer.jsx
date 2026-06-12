import { useEffect } from "react";

import { useDispatch } from "react-redux";

import {
    setCredentials,
    setLoadingComplete,
} from "../features/authSlice";

import { useGetCurrentUserQuery } from "../api/authApi";

const AuthInitializer = ({ children }) => {
    const dispatch = useDispatch();

    const {
        data,
        isLoading,
        isSuccess,
        isError,
    } = useGetCurrentUserQuery();

    useEffect(() => {
        if (isSuccess && data?.user) {
            dispatch(
                setCredentials(data.user)
            );
        }

        if (isError) {
            dispatch(setLoadingComplete());
        }
    }, [
        isSuccess,
        isError,
        data,
        dispatch,
    ]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return children;
};

export default AuthInitializer;