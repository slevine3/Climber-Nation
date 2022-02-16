import { Navigate } from "react-router-dom";

export const NavBar = () => {
  return (
    <div className="nav_container">
      <div className="logo">
        <h3>ClimberNation</h3>
      </div>
      <div className="nav_bar">
        <div className="nav_link">
          <div>
            <a href="/home">Home</a>
          </div>
        </div>
        <div className="nav_link">
          <div>
            <a href="/find_climbers">Find Climbers</a>
          </div>
        </div>
        <div className="nav_link">
          <div>
            <a href="/profile">Profile</a>
          </div>
        </div>
        <div className="nav_link">
          <div>
            <a href="/" onClick={() => localStorage.clear()}>
              Log Out
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
