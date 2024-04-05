import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { useAuth } from './context/AuthContext'; // Kullanıcı durumunu kontrol etmek için hook
import MainLayout from './components/MainLayout'; // Önerilen MainLayout componenti

const AppRoutes = () => {
  const { state: { isAuthenticated } } = useAuth(); // isAuthenticated durumunu kontrol et

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <MainLayout /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        {/* Diğer route'lar ve yönlendirmeler */}
        {/* Varsayılan olarak kullanıcıyı uygun sayfaya yönlendir */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
