import default_profile from "./default_profile.png";
import { NavBar } from "./NavBar";
import { connect } from "react-redux";
import fileSelectHandler from "./Actions.js/Actions";
import axios from "axios";
import React, { useState } from "react";
const FormData = require("form-data");

const Profile = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", file);

    try {
      axios({
        url: "http://localhost:5000/upload",
        method: "POST",
        headers: {},
        data: formData,
      }).then((res) => {
        setError(res.data.error);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavBar />

      <div className="profile_container">
        <div>
          <div>
            <img
              className="profile_image"
              src={default_profile}
              alt="blank"
            ></img>
          </div>
          <div>
            <div>
              <form
                method="POST"
                action="/upload"
                encType="multipart/form-data"
              >
                <input
                  type="file"
                  name="image"
                  multiple={false}
                  onChange={(event) => setFile(event.target.files[0])}
                ></input>
                <div>{error}</div>
                <div>
                  <input
                    name="image"
                    onClick={handleSubmit}
                    type="submit"
                  ></input>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="user_level_container">
          <div className="bouldering">
            <div>
              <h4>Bouldering</h4>
            </div>
            <div>
              <select className="select">
                <option>V0</option>
                <option>V1</option>
                <option>V2</option>
                <option>V3</option>
                <option>V4</option>
                <option>V5</option>
                <option>V6</option>
                <option>V7</option>
                <option>V8</option>
                <option>V9</option>
                <option>V10+</option>
              </select>
            </div>
            <div>
              <h4>Choose Level</h4>
            </div>
          </div>

          <div className="top_rope">
            <div>
              <h4>Top Rope</h4>
            </div>
            <div>
              <select className="select">
                <option>5.5 - 5.9</option>
                <option>5.10a</option>
                <option>5.10b</option>
                <option>5.10c</option>
                <option>5.10d</option>
                <option>5.11a</option>
                <option>5.11b</option>
                <option>5.11c</option>
                <option>5.11d</option>
                <option>5.12a</option>
                <option>5.12b</option>
                <option>5.12c</option>
                <option>5.12d</option>
                <option>5.13+</option>
              </select>
            </div>
            <div>
              <h4>Choose Level</h4>
            </div>
          </div>
          <div className="lead_climb">
            <div>
              <h4>Lead Climb</h4>
            </div>
            <div>
              <select className="select">
                <option>5.5 - 5.9</option>
                <option>5.10a</option>
                <option>5.10b</option>
                <option>5.10c</option>
                <option>5.10d</option>
                <option>5.11a</option>
                <option>5.11b</option>
                <option>5.11c</option>
                <option>5.11d</option>
                <option>5.12a</option>
                <option>5.12b</option>
                <option>5.12c</option>
                <option>5.12d</option>
                <option>5.13+</option>
              </select>
            </div>
            <div>
              <h4>Choose Level</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
