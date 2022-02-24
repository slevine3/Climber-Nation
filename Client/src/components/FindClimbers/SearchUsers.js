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
 
  const navigate = useNavigate();
  const handleSubmit = () => {
    axios
      .get("http://localhost:5000/select-users", {
        params: {
          climbPreference: climbPreference,
          climbType: climbType,
          climbLevel: climbLevel,
        },
      })
      .then((response) => setClimbingPartner(response.data.imageFile))
      .catch((error) => console.log(error));
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
      return climbingPartner.map((data, i) => {
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
                <h2>{data.first_name}</h2>
                <h4>Boulder: {data.bouldering}</h4>
                <h4>Top Rope: {data.top_rope}</h4>
                <h4>Lead Climb: {data.lead_climb}</h4>
              </div>
            </div>
          </div>
        );
      });
    }
  };
  return (
    <div>
      <div className="search-container">
        <div>
          <h2>
            Search For A Partner To Climb
            <select
              name="climbType"
              defaultValue=""
              onChange={(event) => setClimbPreference(event.target.value)}
            >
              <option value="" disabled>
                Choose one
              </option>
              <option>Indoor</option>
              <option>Outdoor</option>
              <option>Both</option>
            </select>
          </h2>
        </div>

        <div>
          <div>
            <h4>I am looking for someone to</h4>
          </div>

          <div>
            <select
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
            <h4>And who's climbing level is</h4>
          </div>

          <div className="center">
            <select
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
          <button onClick={handleSubmit}>Search!</button>
        </div>
      </div>
      <div className="all_users_container"> {renderUsers()} </div>
    </div>
  );
};
