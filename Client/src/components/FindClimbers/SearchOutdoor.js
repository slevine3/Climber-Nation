import { useState } from "react";
import { NavBar } from "../Navigation/NavBar";
import axios from "axios";
import default_profile from "../Navigation/default_profile.png";

export const SearchOutdoor = (event) => {
  const [climbType, setClimbType] = useState(null);
  const [climbLevel, setClimbLevel] = useState(null);
  const [outdoorPartner, setOutdoor] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [userWeatherSearch, setUserWeatherSearch] = useState(null);
  const [todayWeatherMax, setTodayWeatherMax] = useState(null);
  const [todayWeatherMin, setTodayWeatherMin] = useState(null);
  const [tomorrowWeatherMax, setTomorrowWeatherMax] = useState(null);
  const [tomorrowWeatherMin, setTomorrowWeatherMin] = useState(null);

  const [dayAfterTomorrowWeatherMax, setDayAfterTomorrowWeatherMax] =
    useState(null);
  const [dayAfterTomorrowWeatherMin, setDayAfterTomorrowWeatherMin] =
    useState(null);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dateToday = new Date();
  const dayToday = dateToday.getDay();
  const today = daysOfWeek[dayToday];
  const tomorrow = daysOfWeek[dayToday + 1];
  const dayAfterTomorrow = daysOfWeek[dayToday + 2];

  const handleSubmit = () => {
    axios
      .get("http://localhost:5000/select-outdoor-users", {
        params: { climbType: climbType, climbLevel: climbLevel },
      })
      .then((response) => setOutdoor(response.data.imageFile))
      .catch((error) => console.log(error));
  };

  const renderUsers = () => {
    if (outdoorPartner === null) {
      return null;
    } else if (outdoorPartner.length === 0) {
      return <h1>Sorry, no friends available</h1>;
    } else {
      return outdoorPartner.map((data, i) => {
        console.log(data);
        return (
          <div className="user_profile_container" key={i}>
            <div className="user_profile">
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

  const fetchWeather = () => {
    try {
      axios
        .get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${userWeatherSearch}&limit=1&appid=1984e1e45536c054ce01326660f174a3`
        )
        .then((response) => {
          if (response.data.length === 0) {
            return setWeatherData("possibleSpellingError");
          } else {
            axios
              .get(
                `https://api.openweathermap.org/data/2.5/onecall?exclude=minutely,hourly&units=imperial&lat=${response.data[0]?.lat}&lon=${response.data[0]?.lon}&appid=1984e1e45536c054ce01326660f174a3`
              )
              .then((response) => {
                setWeatherData("Display");

                setTodayWeatherMax(response.data.daily[0].temp.max);
                setTodayWeatherMin(response.data.daily[0].temp.min);

                setTomorrowWeatherMax(response.data.daily[1].temp.max);
                setTomorrowWeatherMin(response.data.daily[1].temp.min);

                setDayAfterTomorrowWeatherMax(response.data.daily[2].temp.max);
                setDayAfterTomorrowWeatherMin(response.data.daily[2].temp.min);
              });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const weatherResults = () => {
    if (weatherData === null) {
      return null;
    } else if (weatherData === "possibleSpellingError") {
      return <h1>Please check your spelling</h1>;
    }
  };

  // const fetchCampground = () => {
  //   try {
  //     axios
  //       .get("http://localhost:5000/camping")
  //       .then((results) => console.log(results));
  //   } catch (error) {}
  // };

  // const fetchTrails = () => {
  //   axios
  //     .get("http://localhost:5000/trails")
  //     .then((response) => console.log(response));
  // };

  return (
    <div>
      <NavBar />

      <div>
        <h2>Search For an Outdoor Partner</h2>
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
      {renderUsers()}

      <div>
        <h1>Plan a climbing trip</h1>
      </div>
      <div>Search a city</div>
      <div>
        <input
          type="text"
          onChange={(event) => setUserWeatherSearch(event.target.value)}
        ></input>
      </div>
      <div>
        <button onClick={fetchWeather}>Fetch Weather</button>
      </div>
      {/* <div>
        <button onClick={fetchCampground}>Fetch Campground</button>
      </div>
      <div>
        <button onClick={fetchTrails}>Fetch Trails</button>
      </div> */}
      {weatherResults() === undefined ? (
        <div className="weatherContainer">
          <div>
            <h1>{userWeatherSearch}</h1>
          </div>
          <div>
            <h3>Today</h3>
            <h4>High: {todayWeatherMax}</h4>
            <h4>Low: {todayWeatherMin}</h4>
          </div>
          <div>
            <h3>{tomorrow}</h3>
            <h4>High: {tomorrowWeatherMax}</h4>
            <h4>Low: {tomorrowWeatherMin}</h4>
          </div>
          <div>
            <h3>{dayAfterTomorrow}</h3>
            <h4>High: {dayAfterTomorrowWeatherMax}</h4>
            <h4>Low: {dayAfterTomorrowWeatherMin}</h4>
          </div>
        </div>
      ) : (
        weatherResults()
      )}
    </div>
  );
};
