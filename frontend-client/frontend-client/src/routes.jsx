import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import SignIn from './pages/AuthPages/SignIn';
import SignUp from './pages/AuthPages/SignUp';
import AppLayout from './layout/AppLayout';
import Home from './pages/Dashboard/Home';
import UserProfiles from './pages/UserProfiles';

const RoutesConfig = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    return (
        <Routes>
            <Route
                path="/signin"
                element={isLoggedIn ? <Navigate to="/home" /> : <SignIn title="Sign in" description="sign in" imageUrl="295128.png" />}
            />
            <Route
                path="/signup"
                element={isLoggedIn ? <Navigate to="/home" /> : <SignUp title="Sign up" description="Sign up" imageUrl="295128.png" />}
            />

            {/* Dashboard Layout */}
            <Route element={<AppLayout />}>
                <Route index path="/" element={<Home title="Home" description="Home" imageUrl="home_icon.png"/>} />

                {/* Others Page */}
                <Route path="/profile" element={<UserProfiles />} />
                {/* <Route path="/calendar" element={<Calendar />} />
                <Route path="/blank" element={<Blank />} /> */}

                {/* Forms */}
                {/* <Route path="/form-elements" element={<FormElements />} /> */}

                {/* Tables */}
                {/* <Route path="/basic-tables" element={<BasicTables />} /> */}

                {/* Ui Elements */}
                {/* <Route path="/alerts" element={<Alerts />} />
                <Route path="/avatars" element={<Avatars />} />
                <Route path="/badge" element={<Badges />} />
                <Route path="/buttons" element={<Buttons />} />
                <Route path="/images" element={<Images />} />
                <Route path="/videos" element={<Videos />} /> */}

                {/* Charts */}
                {/* <Route path="/line-chart" element={<LineChart />} />
                <Route path="/bar-chart" element={<BarChart />} /> */}
            </Route>


            <Route
                path="*"
                element={
                    isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/signin" />
                }
            />
        </Routes>
    );
};

export default RoutesConfig;
