import { useState } from "react";
import { NavBar } from "../Navigation/NavBar";
import { useParams } from "react-router-dom";



import axios from "axios";
export const SearchIndoor = (event) => {
  const [climbType, setClimbType] = useState(null);
  const [climbLevelLower, setClimbLevelLower] = useState(null);
  const [climbLevelUpper, setClimbLevelUpper] = useState(null);
  const [indoorPartner, setIndoorPartner] = useState(null);

  const params = useParams();
  const  searchField = params.indoorPartner;
console.log(climbType)
console.log(climbLevelLower)
console.log(climbLevelUpper)
  const handleSubmit = () => {
axios
      .get("http://localhost:5000/select-users", {
        params: {
          searchField: searchField
        },
      })

      .then((response) => console.log(response))
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
        <select onChange={(event) => setClimbType(event.target.value)}>
          <option selected disabled>
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
          <select onChange={(event) => setClimbLevelLower(event.target.value)}
            style={{
              display:
                climbType === null ||
                climbType === "Top Rope" ||
                climbType === "Lead Climb"
                  ? "none"
                  : "block",
            }}
          >
            <option selected disabled>
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
          <select onChange={(event) => setClimbLevelLower(event.target.value)}
            style={{
              display:
                climbType === null || climbType === "Boulder"
                  ? "none"
                  : "block",
            }}
          >
            <option selected disabled>
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
          <select onChange={(event) => setClimbLevelUpper(event.target.value)}
            style={{
              display:
                climbType === null ||
                climbType === "Top Rope" ||
                climbType === "Lead Climb"
                  ? "none"
                  : "block",
            }}
          >
            <option selected disabled>
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
          <select  onChange={(event) => setClimbLevelUpper(event.target.value)}
            style={{
              display:
                climbType === null || climbType === "Boulder"
                  ? "none"
                  : "block",
            }}
          >
            <option selected disabled>
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
  );
};
