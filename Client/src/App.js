import React from "react";
import { Route, Link } from "react-router-dom";
import { BrowserRouter, Routes } from "react-router-dom";
import { Switch } from "react-router";
import FindClimbers from "./components/FindClimbers/FindClimbers";
import  Home  from "./components/Navigation/Home";
import Login from "./components/Sign-In/Login";
import { Register } from "./components/Sign-In/Register";
import Profile from "./components/Navigation/Profile";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import { useEffect } from "react";
import "./components/Sign-In/Login.css";
import "./components/Sign-In/Register.css";
import "./components/Navigation/NavBar.css";
import "./components/Navigation/Home.css";
import "./components/Navigation/Profile.css";
import { SearchIndoor } from "./components/FindClimbers/SearchIndoor";

const App = () => {

  const navigate = useNavigate();
  useEffect(() => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status !== 200) {
          localStorage.removeItem("token");
          navigate('/login') 
        }
      }
    );

    axios
      .get("http://localhost:5000/authentication", {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((error) => {
        if (error.status === 200) return;
      });
  }, []);

  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/find_climbers" element={<FindClimbers />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search-indoor/:fieldData" element={<SearchIndoor />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;
