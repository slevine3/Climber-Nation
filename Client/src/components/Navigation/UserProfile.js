import { NavBar } from "./NavBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import default_profile from "../Navigation/default_profile.png";
import { Link } from "react-router-dom";

export const UserProfile = () => {
  const [first_name, setFirstName] = useState(null);
  const [image, setImage] = useState(null);
  const [climbing_preference, setClimbingPreference] = useState(null);
  const [bouldering, setBouldering] = useState(null);
  const [top_rope, setTopRope] = useState(null);
  const [lead_climb, setLeadClimb] = useState(null);

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
      .get("https://climber-nation.herokuapp.com/authentication", {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((error) => {
        if (error.status === 200) {
          try {
            axios
              .get("https://climber-nation.herokuapp.com/visit_user_profile", {
                params: {
                  visiting_user_id: localStorage.getItem("visiting_user_id"),
                },
              })
              .then((response) => {
                setFirstName(response.data.visiting_user_data[0].first_name);
                setImage(response.data.imageFile);
                setClimbingPreference(
                  response.data.visiting_user_data[0].climbing_preference
                );
                setBouldering(response.data.visiting_user_data[0].bouldering);
                setTopRope(response.data.visiting_user_data[0].top_rope);
                setLeadClimb(response.data.visiting_user_data[0].lead_climb);
              });
          } catch (error) {
            console.log(error);
          }
        }
        return;
      });
  });

  return (
    <div>
      <NavBar />
      <div className="visiting_profile_container">
        <div className="visiting_profile_image">
          <img
            className="profile_image"
            type="file"
            name="image"
            src={image ? image : default_profile}
            alt="profile_image"
          ></img>
        </div>
        <h1>{first_name}</h1>
        <div>
          <h1 className="visiting_profile_contents">
            Climbing Preference: {climbing_preference}
          </h1>
          <h1 className="visiting_profile_contents">
            Bouldering: {bouldering}
          </h1>
          <h1 className="visiting_profile_contents">Top Rope: {top_rope}</h1>
          <h1 className="visiting_profile_contents">
            Lead Climb: {lead_climb}
          </h1>
        </div>
        <Link to="/home" className="button-84" style={{"marginTop": '20px'}}>
          Back to Search
        </Link>
      </div>
    </div>
  );
};
