import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import AuthLayout from './layouts/AuthLayout';
import VerifyOTP from './components/VerifyOTP';
import PrivateRoute from './components/PrivateRoute';  
import ForgotPasswordForm from './components/password/ForgotPasswordForm';
import ResetPasswordForm from './components/password/ResetPasswordForm';
import NotFound from './pages/NotFound';  

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AuthLayout />} />
                <Route path="/login" element={<AuthLayout />} />
                <Route path="/signup" element={<AuthLayout />} />
                <Route path="/verify-otp" element={<VerifyOTP />} />
                <Route path="/forgot-password" element={<ForgotPasswordForm/>} />
                <Route path="/reset-password/:token" element={<ResetPasswordForm/>} />
                <Route 
                    path="/dashboard" 
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;



