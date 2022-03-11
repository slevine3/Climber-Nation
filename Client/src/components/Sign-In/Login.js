import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = (props) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const navigate = useNavigate();

  onkeyup = (event) => {
    handleKeyPress(event);
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = async (event) => {
    axios
      .post("https://climber-nation.herokuapp.com/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data.auth) {
          localStorage.setItem("token", response.data.accessToken);
          authenticateUser();
        } else {
          if (response.data === "This username does not exist") {
            setUsernameError("This username does not exist");
            setPasswordError(null);
          } else {
            setUsernameError(null);
            setPasswordError(response.data);
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const authenticateUser = async () => {
    axios
      .get("https://climber-nation.herokuapp.com/authentication", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("name", response.data.allUserInfo?.first_name);
          localStorage.setItem("imageFile", response.data?.imageFile);
          localStorage.setItem("user_id", response.data.allUserInfo?.user_id);

          navigate("/home");
        }
      });
  };
 
  return (
    <div className="login_container">
      <div className="login_input">
        <div>
          <h3>Login</h3>
        </div>
        <div className="login_username">
          <label htmlFor="username">Username</label>
        </div>
        <div>
          <input
            onChange={(event) => setUsername(event.target.value)}
            name="username"
            type="text"
          ></input>
        </div>
        <div className="login_message">{usernameError}</div>
        <div className="login_password">
          <label htmlFor="password">Password</label>
        </div>

        <div>
          <input
            onChange={(event) => setPassword(event.target.value)}
            name="password"
            type="password"
          ></input>
        </div>
        <div className="login_message">{passwordError}</div>
        <div>
          <button className="input_button" type="submit" onClick={handleSubmit}>
            Login
          </button>
        </div>
        <div>
          <a className="login_href" href="/register">
            Register Here!
          </a>
        </div>
      </div>
    </div>
  );
};



export default Login;
