import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import IdeasPage from '../pages/ideasPage';
import UserManagementPage from '../pages/UserManagementPage';
import DashboardPage from '../pages/DashboardPage';


const AppRoute = () => {
    return (
        <>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                    <Route element={<MainLayout />}>
                        <Route path="/ideas" element={<IdeasPage />} />

                        <Route element={<AdminRoute />}>
                            <Route path="/admin/dashboard" element={<DashboardPage />} />
                            <Route path="/admin/users" element={<UserManagementPage />} />
                        </Route>
                    </Route>

                </Route>

                <Route path="*" element={<Navigate to="/ideas" replace />} />

            </Routes>
        </>
    );
};

export default AppRoute;
