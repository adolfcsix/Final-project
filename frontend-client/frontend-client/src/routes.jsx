import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './core/components/PrivateRoute/PrivateRoute';
import { Navigate } from 'react-router-dom';
import LoginComponent from './core/components/Login/Login';
import HomeComponent from './components/Home/Home';
import RegisterComponent from './core/components/Register/Register';

const RoutesConfig = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    return (
        <Routes>
            <Route
                path="/login"
                element={isLoggedIn ? <Navigate to="/home" /> : <LoginComponent title="Login" imageUrl="295128.png" />}
            />
            <Route
                path="/register"
                element={<RegisterComponent title="Register" imageUrl="295128.png" />}
            />
            <Route
                path="/home"
                element={<PrivateRoute element={<HomeComponent />} />}
            />
            <Route
                path="*"
                element={
                    isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />
                }
            />
        </Routes>
    );
};

export default RoutesConfig;
