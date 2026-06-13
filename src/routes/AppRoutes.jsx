import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import MySnippets from "../pages/MySnippets";
import Folders from "../pages/Folders";

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
        </Routes>
    );
};

export default AppRoutes;