import React from "react";
import { Route, Routes } from "react-router-dom";

import "./components/Sign-In/Login.css";
import "./components/Sign-In/Register.css";
import "./components/Navigation/NavBar.css";
import "./components/Navigation/Profile.css";
import "./components/Navigation/UserProfile.css"
import "./components/Navigation/Home.css";

import Home from "./components/Navigation/Home";
import Login from "./components/Sign-In/Login";
import { Register } from "./components/Sign-In/Register";
import Profile from "./components/Navigation/Profile";
import { UserProfile } from "./components/Navigation/UserProfile";
import ErrorPage from "./components/ErrorPage";
const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;
