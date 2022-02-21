import { useState } from "react";
import { NavBar } from "../Navigation/NavBar";
import { useParams } from "react-router-dom";

import axios from "axios";
export const SearchIndoor = (event) => {
  const [climbType, setClimbType] = useState(null);
  const [climbLevelLower, setClimbLevelLower] = useState(null);
  const [climbLevelUpper, setClimbLevelUpper] = useState(null);
  const [indoorPartner, setIndoorPartner] = useState(null);

  console.log(indoorPartner);
  const handleSubmit = () => {
    axios
      .get("http://localhost:5000/select-users", {
        headers: { climbType: climbType },
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
          <option>Boulder</option>
          <option>Top Rope</option>
          <option>Lead Climb</option>
        </select>
      </div>

      <div
        className="secondDivContainer"
        style={{
          display: climbType === null ? "none" : "block",
        }}
      >
        <div>
          <h4>And who's climbing level is between</h4>
        </div>

        <div>
          <select
            defaultValue=""
            name="climbLevelLower"
            onChange={(event) => setClimbLevelLower(event.target.value)}
            style={{
              display:
                climbType === null ||
                climbType === "Top Rope" ||
                climbType === "Lead Climb"
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
            onChange={(event) => setClimbLevelLower(event.target.value)}
            style={{
              display:
                climbType === null || climbType === "Boulder"
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
        <h4>AND</h4>
        <div>
          <select
            defaultValue=""
            name="climbLevelUpper"
            onChange={(event) => setClimbLevelUpper(event.target.value)}
            style={{
              display:
                climbType === null ||
                climbType === "Top Rope" ||
                climbType === "Lead Climb"
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
            name="climbLevelUpper"
            onChange={(event) => setClimbLevelUpper(event.target.value)}
            style={{
              display:
                climbType === null || climbType === "Boulder"
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
              <div>
                <img
                  key={i}
                  className="profile_image"
                  type="file"
                  name="image"
                  src={"http://localhost:5000/images/" + data.filename}
                  alt="profile image"
                ></img>
                <h3>{data.first_name}</h3>
              </div>
            );
          })}
    </div>
  );
};
