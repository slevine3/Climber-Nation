import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { newUserLogIn } from "../Actions/Actions";

const Login = (props) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [first_name, setFirstName] = useState("");
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    axios
      .post("http://localhost:5000/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data.auth) {
          localStorage.setItem("token", response.data.accessToken);
          authenticateUser();
        } else {
          setMessage(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const authenticateUser = async () => {
    axios
      .get("http://localhost:5000/authentication", {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("name", response.data.allUserInfo.first_name);
          localStorage.setItem("imageFile", response.data.imageFile);
          localStorage.setItem("user_id", response.data.allUserInfo.user_id);

          navigate("/home");
        }
      });
  };
  props.newUserLogIn(first_name);
  return (
    <div className="login_container">
      <div className="login_input">
        <div>
          <h3>Login</h3>
        </div>
        <div>
          <label htmlFor="username">Username</label>
        </div>
        <div>
          <input
            onChange={(event) => setUsername(event.target.value)}
            name="username"
            type="text"
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
        </div>
        <div>
          <input
            onChange={(event) => setPassword(event.target.value)}
            name="password"
            type="text"
          ></input>
        </div>

        <div>
          <button className="input_button" type="submit" onClick={handleSubmit}>
            Login
          </button>
        </div>
        <div>
          <a href="/register">Don't have an account? Click here to sign up</a>
        </div>
        <div>{message}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    newUserLogIn: (first_name) => dispatch(newUserLogIn(first_name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
