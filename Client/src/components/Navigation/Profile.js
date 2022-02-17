import default_profile from "./default_profile.png";
import { NavBar } from "./NavBar";
import { connect } from "react-redux";
import fileSelectHandler from "../Actions/Actions";
import axios from "axios";
import React, { useState } from "react";
const FormData = require("form-data");

const Profile = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleOnChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("image", file);
    formData.append("user_id", localStorage.getItem("user_id"));
    try {
      axios({
        url: "http://localhost:5000/upload",
        method: "POST",
        headers: {},
        data: formData,
        onUploadProgress: (ProgressEvent) => {
          console.log(
            "Upload Progress: " +
              Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
              "%"
          );
        },
      }).then((response) => {
        setError(response.data.error);
      });
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      fetchImage();
    }, 1000);
  };

  const fetchImage = () => {
    console.log("running");
    try {
      axios
        .get("http://localhost:5000/authentication", {
          headers: { authorization: localStorage.getItem("token") },
        })
        .then((response) => {
          if (localStorage.getItem("imageFile") !== null) {
            console.log(response.data.imageFile);
            localStorage.setItem("imageFile", response.data.imageFile);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = () => {
    // localStorage.setItem("imageFile", response.data.imageFile);
    window.location.reload();
  };
  return (
    <div>
      <NavBar />

      <div className="profile_container">
        <div>
          <div>
            <img
              className="profile_image"
              type="file"
              name="image"
              src={
                localStorage.getItem("imageFile") ===
                "http://localhost:5000/images/undefined"
                  ? default_profile
                  : localStorage.getItem("imageFile")
              }
              alt="profile image"
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
                  onChange={handleOnChange}
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
        <div>
          <button onClick={handleUpload}>Upload</button>
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
