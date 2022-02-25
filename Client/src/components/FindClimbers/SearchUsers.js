import { useState } from "react";
import axios from "axios";
import default_profile from "../Navigation/default_profile.png";
import { UserProfile } from "../Navigation/UserProfile";
import { useNavigate } from "react-router-dom";
export const SearchUsers = (event) => {
  const [climbPreference, setClimbPreference] = useState(null);
  const [climbType, setClimbType] = useState(null);
  const [climbLevel, setClimbLevel] = useState(null);
  const [climbingPartner, setClimbingPartner] = useState(null);
  const [distance, setDistance] = useState(null);
  const [zip_code, setZipCode] = useState(null);
  const [users_zip_codes, setUserZipCodes] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await axios
        .get("http://localhost:5000/select-users", {
          params: {
            climbPreference: climbPreference,
            climbType: climbType,
            climbLevel: climbLevel,
            user_id: localStorage.getItem("user_id"),
          },
        })
        .then((response) => {
          setClimbingPartner(response.data.imageFile);
          setDistance(response.data.distance);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserProfile = (event) => {
    localStorage.setItem("visiting_user_id", event.target.id);
    navigate("/user-profile");
  };

  const renderUsers = () => {
    if (climbingPartner === null) {
      return null;
    } else if (climbingPartner.length === 0) {
      return <h1>Sorry, no friends available</h1>;
    } else {
      if (climbingPartner && distance) {
        let array = [];
        // console.log(distance)
        // console.log(climbingPartner)
        let newArray = [];
        return climbingPartner.map((data, i) => {
          const mappedDistance = distance[i];
          const values = Object.assign(mappedDistance, data);
          array.push(values);
          console.log(array[0].distance.value);
 

          return (
            <div className="user_profile_container" key={data.user_id}>
              <div
                className="user_profile"
                id={data.user_id}
                onClick={handleUserProfile}
              >
                <img
                  className="profile_image"
                  type="file"
                  name="image"
                  src={
                    data.filename !== null
                      ? "http://localhost:5000/images/" + data.filename
                      : default_profile
                  }
                  alt="profile image"
                ></img>
                <div className="user_info">
                  <h2>{values.name}</h2>
                  <h4>Boulder: {values.bouldering}</h4>
                  <h4>Top Rope: {values.top_rope}</h4>
                  <h4>Lead Climb: {values.lead_climb}</h4>
                  <h4>Distance:{values.distance.text}</h4>
                </div>
              </div>
            </div>
          );
        });
      }
    }
  };

  return (
    <div>
      <div className="search-container">
        <div>
          <div>
            <h2>Filter Search Options: </h2>
          </div>
          <select
            className="select"
            name="climbType"
            defaultValue=""
            onChange={(event) => setClimbPreference(event.target.value)}
          >
            <option value="" disabled>
              Choose one
            </option>
            <option>Indoor</option>
            <option>Outdoor</option>
            <option>Either/Both</option>
          </select>
        </div>

        <div>
          <div>
            <h2>Climb Location: </h2>
          </div>

          <div>
            <select
              className="select"
              name="climbType"
              defaultValue=""
              onChange={(event) => setClimbType(event.target.value)}
            >
              <option value="" disabled>
                Choose one
              </option>
              <option>bouldering</option>
              <option>top_rope</option>
              <option>lead_climb</option>
            </select>
          </div>
        </div>
        <div
          style={{
            display: climbType === null ? "none" : "block",
          }}
        >
          <div>
            <h2>Climbing Level</h2>
          </div>

          <div className="center">
            <select
              className="select"
              defaultValue=""
              name="climbLevelLower"
              onChange={(event) => setClimbLevel(event.target.value)}
              style={{
                display:
                  climbType === null ||
                  climbType === "top_rope" ||
                  climbType === "lead_climb"
                    ? "none"
                    : "block",
              }}
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

          <div className="center">
            <select
              className="select"
              defaultValue=""
              name="climbLevelLower"
              onChange={(event) => setClimbLevel(event.target.value)}
              style={{
                display:
                  climbType === null || climbType === "bouldering"
                    ? "none"
                    : "block",
              }}
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
          <br></br>
          <button className="button-84" onClick={handleSubmit}>
            Search!
          </button>
        </div>
      </div>
      <div className="all_users_container"> {renderUsers()} </div>

      <div>
        <h4></h4>
      </div>
    </div>
  );
};
