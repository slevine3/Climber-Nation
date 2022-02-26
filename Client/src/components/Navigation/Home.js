import { NavBar } from "./NavBar";
import { connect } from "react-redux";
import { SearchUsers } from "../FindClimbers/SearchUsers";

import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Home = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status !== 200) {
          localStorage.removeItem("token");
          navigate("/login");
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
  const name = localStorage.getItem("name");
  return (
    <div>
      <NavBar />
      <div>
        <h1>Welcome {name}</h1>
      </div>
      <SearchUsers />
    </div>
  );
};

export default Home;
