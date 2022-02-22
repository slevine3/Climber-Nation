import { useState } from "react";
import axios from "axios";

export const Register = () => {
  const [first_name, setFirstName] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [firstNameError, setFirstNameError] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:5000/register", {
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
        } else {
          setFirstNameError(null);
          setUsernameError(null);
          setPasswordError("Please enter a password");
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
              type="text"
            ></input>
            <div className="register_message">{passwordError}</div>
          </div>

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
