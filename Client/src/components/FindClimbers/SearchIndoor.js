import { useState } from "react";
import { NavBar } from "../Navigation/NavBar";
import { useParams } from "react-router-dom";
import axios from "axios";

export const SearchIndoor = (event) => {
  const [climbType, setClimbType] = useState(null);
  const [climbLevel, setClimbLevel] = useState(null);

  const [indoorPartner, setIndoorPartner] = useState(null);

  const handleSubmit = () => {
    axios
      .get("http://localhost:5000/select-users", {
        params: { climbType: climbType, climbLevel: climbLevel },
      })
      .then((response) => setIndoorPartner(response.data.imageFile))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <NavBar />

      <div>
        <h2>Search For an Indoor Partner</h2>
      </div>
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

      <div
        className="secondDivContainer"
        style={{
          display: climbType === null ? "none" : "block",
        }}
      >
        <div>
          <h4>And who's climbing level is</h4>
        </div>

        <div>
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

        <div>
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

      {indoorPartner === null
        ? null
        : indoorPartner.map((data, i) => {
            return (
              <div className="user_profile_container" key={i}>
                <div className="user_profile">
                  <img
                    className="profile_image"
                    type="file"
                    name="image"
                    src={"http://localhost:5000/images/" + data.filename}
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
          })}
    </div>
  );
};
