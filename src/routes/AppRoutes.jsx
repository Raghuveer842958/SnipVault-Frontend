import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import MySnippets from "../pages/MySnippets";
import Folders from "../pages/Folders";
import Explore from "../pages/Explore";
import SnippetDetail from "../pages/SnippetDetail";
import Profile from "../pages/Profile";

const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/snippets"
                element={
                    <ProtectedRoute>
                        <MySnippets />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/folders"
                element={
                    <ProtectedRoute>
                        <Folders />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/explore"
                element={
                    <ProtectedRoute>
                        <Explore />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/snippets/:id"
                element={
                    <ProtectedRoute>
                        <SnippetDetail />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};

export default AppRoutes;