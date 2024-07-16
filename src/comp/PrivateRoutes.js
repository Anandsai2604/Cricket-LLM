import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
    const isAuthenticated = localStorage.getItem('userId') !== null;;

    return isAuthenticated ? <Outlet /> : <Navigate to="/loginRegister" />;
};

export default PrivateRoutes;
