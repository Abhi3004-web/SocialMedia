import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import Profile from "../pages/Profile/Profile";
import EditProfile from "../pages/EditProfile/EditProfile";
import Settings from "../pages/Settings/Settings";
import ProtectedRoute from "../components/Common/ProtectedRoute";

export default function ProfileRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={<ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>}
            />

            <Route
                path="/profile"
                element={<ProtectedRoute>
                    <Profile />
                </ProtectedRoute>}
            />

            <Route
                path="/edit-profile"
                element={<ProtectedRoute>
                    <EditProfile />
                </ProtectedRoute>}
            />

            <Route
                path="/settings"
                element={<ProtectedRoute>
                    <Settings />
                </ProtectedRoute>}
            />
        </Routes>
    );
}