import { useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [first_name, setFirstName] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [firstNameError, setFirstNameError] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [message, setMessage] = useState(null);

  // const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    axios
      .post("https://climber-nation.herokuapp.com/register", {
        first_name: first_name,
        username: username,
        password: password,
      })
      .then(function (response) {
        if (!first_name) {
          setFirstNameError("Please enter a first name");
          setUsernameError(null);
          setPasswordError(null);
        } else if (!username) {
          setFirstNameError(null);
          setUsernameError("Please enter a username");
          setPasswordError(null);
        } else if (!password) {
          setFirstNameError(null);
          setUsernameError(null);
          setPasswordError("Please enter a password");
        } else if (response.data === "username exists") {
          setFirstNameError(null);
          setUsernameError("This user already exists");
          setPasswordError(null);
        } else if (response.data === "longer password") {
          setFirstNameError(null);
          setUsernameError(null);
          setPasswordError("Password must be at least 6 characters");
        } else if (response.data === "Account Created!") {
          setFirstNameError(null);
          setUsernameError(null);
          setPasswordError(null);
          setMessage(response.data);

          // navigate('/home')
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="register_container">
      <div className="register_input">
        <form method="POST">
          <div>
            <h3>Register</h3>
          </div>

          <div>
            <label htmlFor="first_name">First Name</label>
          </div>
          <div>
            <input
              onChange={(event) => setFirstName(event.target.value)}
              name="first_name"
              type="text"
              encType="multipart/form-data"
            ></input>
          </div>
          <div className="register_message">{firstNameError}</div>
          <div>
            <label htmlFor="username">Username</label>
          </div>
          <div>
            <input
              onChange={(event) => setUsername(event.target.value)}
              name="username"
              type="text"
              encType="multipart/form-data"
            ></input>
          </div>
          <div className="register_message">{usernameError}</div>
          <div>
            <label htmlFor="password">Password</label>
          </div>
          <div>
            <input
              onChange={(event) => setPassword(event.target.value)}
              name="password"
              type="password"
            ></input>
            <div className="register_message">{passwordError}</div>
          </div>
          <div style={{ color: '#299617' }}>{message}</div>
          <div>
            <button
              className="register_button"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>

          <div>
            <a className="register_href" href="/login">
              Login Here!
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
