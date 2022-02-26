import { Navigate } from "react-router-dom";

export const NavBar = () => {
  return (
    <div className="nav_container">
      <div className="logo">
        <a href="/home">
          <h3 className="logo_name">ClimberNation</h3>
        </a>
      </div>
      <div className="nav_bar">
        <div className="nav_link">
          <div>
            <a href="/home">Home</a>
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
