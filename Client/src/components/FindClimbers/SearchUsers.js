import { useState } from "react";
import axios from "axios";
import default_profile from "../Navigation/default_profile.png";
import { UserProfile } from "../Navigation/UserProfile";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export const SearchUsers = (event) => {
  const [climbPreference, setClimbPreference] = useState(null);
  const [climbType, setClimbType] = useState(null);
  const [climbLevel, setClimbLevel] = useState(null);
  const [climbingPartner, setClimbingPartner] = useState(null);
  const [distance, setDistance] = useState(null);
  const [zip_code, setZipCode] = useState(null);
  const [users_zip_codes, setUserZipCodes] = useState(null);
  const [finalValues, setFinalValues] = useState(null);
  const [initialUsers, setInitialUsers] = useState(null);
  const [initialUsersWithZipCode, setInitialUsersWithZipCode] = useState(null);
  const [showPageLoadSearch, setShowPageLoadSearch] = useState(false);
  const [climbingPartnerFromReload, setClimbingPartnerFromReload] =
    useState(null);
  const [distanceFromReload, setDistanceFromReload] = useState(null);
  const navigate = useNavigate();

  useEffect(async () => {
    try {
      await axios
        .get("http://localhost:5000/random-users", {
          params: {
            user_id: localStorage.getItem("user_id"),
          },
        })
        .then((response) => {
          setInitialUsers(response.data.allUserData);
          setInitialUsersWithZipCode(response.data.allUserData);
          setClimbingPartnerFromReload(response.data.imageFile);
          setDistanceFromReload(response.data.distance);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSubmit = async () => {
    setShowPageLoadSearch(true);
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
        climbingPartner.map((data, i) => {
          const mappedDistance = distance[i];
          const values = Object.assign(mappedDistance, data);
          array.push(values);
          array.sort((a, b) => a.distance.value - b.distance.value);
        });
        return array.map((element) => {
          console.log(element);
          return (
            <div className="user_profile_container" key={element.user_id}>
              <div
                className="user_profile"
                id={element.user_id}
                onClick={handleUserProfile}
              >
                <img
                  className="profile_image"
                  type="file"
                  name="image"
                  src={
                    element.filename !== null
                      ? "http://localhost:5000/images/" + element.filename
                      : default_profile
                  }
                  alt="profile image"
                ></img>
                <div className="user_info">
                  <h2>{element.first_name}</h2>
                  <h4>Boulder: {element.bouldering}</h4>
                  <h4>Top Rope: {element.top_rope}</h4>
                  <h4>Lead Climb: {element.lead_climb}</h4>
                  <h4>Distance:{element.distance.text}</h4>
                </div>
              </div>
            </div>
          );
        });
      }
    }
  };

  const pageLoadSearch = () => {
    if (initialUsers) {
      console.log("[initialUsers]", initialUsers);
      return initialUsers.map((element) => {
        return (
          <div
            key={element.user_id}
            style={{ display: showPageLoadSearch ? "none" : "block" }}
            className="all_users_container"
          >
            <div className="user_profile_container">
              <div
                className="user_profile"
                id={element.user_id}
                onClick={handleUserProfile}
              >
                <img
                  className="profile_image"
                  type="file"
                  name="image"
                  src={
                    element.filename !== null
                      ? "http://localhost:5000/images/" + element.filename
                      : default_profile
                  }
                  alt="profile image"
                ></img>
                <div className="user_info">
                  <h2>{element.first_name}</h2>
                  <h4>Boulder: {element.bouldering}</h4>
                  <h4>Top Rope: {element.top_rope}</h4>
                  <h4>Lead Climb: {element.lead_climb}</h4>
                </div>
              </div>
            </div>
          </div>
        );
      });
    } else {
      if (climbingPartnerFromReload && distanceFromReload) {
        let array = [];
        climbingPartnerFromReload.map((data, i) => {
          const mappedDistance = distanceFromReload[i];
          const values = Object.assign(mappedDistance, data);
          array.push(values);
          array.sort((a, b) => a.distance.value - b.distance.value);
        });
        return array.map((element) => {
          return (
            <div
              style={{ display: showPageLoadSearch ? "none" : "block" }}
              className="user_profile_container"
              key={element.user_id}
            >
              <div
                className="user_profile"
                id={element.user_id}
                onClick={handleUserProfile}
              >
                <img
                  className="profile_image"
                  type="file"
                  name="image"
                  src={
                    element.filename !== null
                      ? "http://localhost:5000/images/" + element.filename
                      : default_profile
                  }
                  alt="profile image"
                ></img>
                <div className="user_info">
                  <h2>{element.first_name}</h2>
                  <h4>Boulder: {element.bouldering}</h4>
                  <h4>Top Rope: {element.top_rope}</h4>
                  <h4>Lead Climb: {element.lead_climb}</h4>
                  <h4>Distance:{element.distance.text}</h4>
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
            <h3>Filter Search Options: </h3>
          </div>
          <select
            className="filter_box"
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
        </div>

        <div>
          <div>
            <h3>Climb Location: </h3>
          </div>

          <div>
            <select
              className="filter_box"
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
            <h3>Climbing Level</h3>
          </div>

          <div>
            <select
              className="filter_box"
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

          <div>
            <select
              className="filter_box"
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

      <div className="all_users_container"> {pageLoadSearch()}</div>
    </div>
  );
};
