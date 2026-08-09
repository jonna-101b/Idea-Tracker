import { Routes, Route, Navigate } from "react-router-dom";
// import ProtectedRoute from './ProtectedRoute';
// import AdminRoute from './AdminRoute';
import AuthLayout from '../layouts/AuthLayout';
// import MainLayout from '../layouts/MainLayout';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
// import DashboardPage from '../pages/DashboardPage';
// import IdeasPage from '../pages/IdeasPage';
// import UserManagementPage from '../pages/UserManagementPage';


const AppRoute = () => {
    return (
        <>
            <Routes>
                // Public routes
                <Route element={<AuthLayout />}>
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Route>

                {/* Private routes */}
                {/* <Route element={<ProtectedRoute />}>
                    <Route element={<MainLayout />}>
                        <Route path="/ideas" element={<IdeasPage />} /> */}

                        {/* Admin routes */}
                        {/* <Route element={<AdminRoute />}>
                            <Route path="/admin/dashboard" element={<DashboardPage />} />
                            <Route path="/admin/users" element={<UserManagementPage />} />
                        </Route>
                    </Route>

                </Route>

                <Route path="*" element={<Navigate to="/ideas" replace />} /> */}

            </Routes>
        </>
    );
};

export default AppRoute;