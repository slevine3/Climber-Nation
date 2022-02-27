import default_profile from "./default_profile.png";
import { NavBar } from "./NavBar";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
const FormData = require("form-data");

const Profile = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);
  const [current_city, setCurrentCity] = useState(null);
  const [climbing_preference, setClimbingPreference] = useState(null);
  const [bouldering, setBouldering] = useState(null);
  const [top_rope, setTopRope] = useState(null);
  const [lead_climb, setLeadClimb] = useState(null);
  const [zipCode, setZipCode] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [storageClimbPreference, setStorageClimbPreference] = useState(null);
  const [storageBouldering, setStorageBouldering] = useState(null);
  const [storageTopRope, setStorageTopRope] = useState(null);
  const [storageLeadClimb, setStorageLeadClimb] = useState(null);
  const [storageZipCode, setStorageZipCode] = useState(null);
  const [message, setMessage] = useState(null);

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
        if (error.status === 200) {
          axios
            .get("http://localhost:5000/my_profile", {
              params: { user_id: localStorage.getItem("user_id") },
            })
            .then((response) => {
              {
                setStorageClimbPreference(
                  response.data.allUserData[0].climbing_preference
                );
                setStorageBouldering(response.data.allUserData[0].bouldering);
                setStorageTopRope(response.data.allUserData[0].top_rope);
                setStorageLeadClimb(response.data.allUserData[0].lead_climb);
                setStorageZipCode(response.data.allUserData[0].zip_code);
              }
            });
        }

        return;
      });
  }, []);

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

    axios
      .get("http://localhost:5000/fetch-image", {
        params: { user_id: localStorage.getItem("user_id") },
      })
      .then((response) => {
        localStorage.setItem("imageFile", response.data.imageFile);
      
        window.location.reload();
      })
      .catch(error);
  };

  const handleData = async (event) => {
    event.preventDefault();

    if (zipCode.length !== 5) {
      setMessage("Please enter a 5-digit valid US zip code");
      return;
    }

    window.location.reload();
    setShowProfile(false);

    axios
      .post("http://localhost:5000/data", {
        climbing_preference: climbing_preference,
        bouldering: bouldering,
        top_rope: top_rope,
        lead_climb: lead_climb,
        zipCode: zipCode,
        user_id: localStorage.getItem("user_id"),
      })
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <NavBar />

      <div
        className="profile_container"
        style={{ display: showProfile ? "block" : "none" }}
      >
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
                <div className="error_message">{error}</div>
                <div>
                  <button
                    className="center"
                    name="image"
                    onClick={handleSubmit}
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="user_level_container">
          <div>
            <div>
              <h4>Zip Code</h4>
            </div>
            <div>
              <input
                onChange={(event) => setZipCode(event.target.value)}
                className="select"
              ></input>
              <h5 className="error_message">{message}</h5>
            </div>
          </div>
          <div>
            <div>
              <h4>Climbing Preference</h4>
            </div>
            <div>
              <select
                defaultValue=""
                onChange={(event) => setClimbingPreference(event.target.value)}
                className="select"
              >
                <option value="" disabled>
                  Choose one
                </option>
                <option>Indoor</option>
                <option>Outdoor</option>
                <option>Both</option>
              </select>
            </div>
          </div>

          <div className="bouldering">
            <div>
              <h4>Bouldering</h4>
            </div>
            <div>
              <select
                defaultValue=""
                onChange={(event) => setBouldering(event.target.value)}
                className="select"
              >
                <option value="" disabled>
                  Choose one
                </option>
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
          </div>

          <div className="top_rope">
            <div>
              <h4>Top Rope</h4>
            </div>
            <div>
              <select
                defaultValue=""
                onChange={(event) => setTopRope(event.target.value)}
                className="select"
              >
                <option value="" disabled>
                  Choose one
                </option>
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
          </div>
          <div
            onChange={(event) => setLeadClimb(event.target.value)}
            className="lead_climb"
          >
            <div>
              <h4>Lead Climb</h4>
            </div>
            <div>
              <select defaultValue="" className="select">
                <option value="" disabled>
                  Choose one
                </option>
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
          </div>
        </div>
        <div>
          <button className="button-84" onClick={handleData}>
            Save Changes
          </button>
        </div>
      </div>

      <div className="container_my_profile">
        <div
          style={{ display: showProfile ? "none" : "block" }}
          className="my_profile"
        >
          <div>
            <img
              className="my_profile_image"
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

          <div className="my_profile_preferences">
            <h3>Climbing Preference: {storageClimbPreference} </h3>
          </div>
          <div>
            <h3>Bouldering: {storageBouldering} </h3>
          </div>
          <div>
            <h3>Top Rope: {storageTopRope} </h3>
          </div>
          <div>
            <h3>Lead Climb: {storageLeadClimb} </h3>
          </div>
          <div>
            <h3>Zip Code: {storageZipCode} </h3>
          </div>

          <button className="button-84" onClick={() => setShowProfile(true)}>
            Make Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
