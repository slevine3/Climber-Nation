import { useState } from "react";
import axios from "axios";

export const Register = () => {
  const [first_name, setFirstName] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:5000/register", {
        first_name: first_name,
        username: username,
        password: password,
      })
      .then(function (response) {
        setMessage(response.data)
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
            <button className="register_button" type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          <div><a href='/login'>Already a have an account? Click here to login</a> </div>
          <div>{message}</div>
        </form>
      </div>
    </div>
  );
};
