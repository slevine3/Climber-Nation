import { NavBar } from "./NavBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import default_profile from "../Navigation/default_profile.png";
export const UserProfile = () => {
  const [first_name, setFirstName] = useState(null);
  const [image, setImage] = useState(null);
  const [city, setCity] = useState(null);
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
      .get("http://localhost:5000/authentication", {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((error) => {
        if (error.status === 200) {
          try {
            axios
              .get("http://localhost:5000/visit_user_profile", {
                params: {
                  visiting_user_id: localStorage.getItem("visiting_user_id"),
                },
              })
              .then((response) => {
                setFirstName(response.data.visiting_user_data[0].first_name);
                setCity(response.data.visiting_user_data[0].current_city);
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
  }, []);

  return (
    <div>
      <NavBar />
      <div>
        <div>
          <div > 
            <img
              className="profile_image"
              type="file"
              name="image"
              src={image ? image : default_profile}
              alt="profile image"
            ></img>
          </div>
          <h1>{first_name}</h1>
        </div>
        <div>
          <h1>{city}</h1>
        </div>
        <div>
          <h1>Climbing Preference: {climbing_preference}</h1>
        </div>
        <div>
          <h1>Bouldering: {bouldering}</h1>
        </div>
        <div>
          <h1>Top Rope: {top_rope}</h1>
        </div>
        <div>
          <h1>Lead Climb:{lead_climb}</h1>
        </div>
      </div>
    </div>
  );
};
