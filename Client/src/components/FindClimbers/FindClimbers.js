import { ChooseIndoor } from "./ChooseIndoor";
import { ChooseOutdoor } from "./ChooseOutdoor";
import { NavBar } from "../Navigation/NavBar";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

const FindClimbers = () => {

    return (
      <div>
        <NavBar />

        <div className="chooseClimb">
          <ChooseIndoor />
          <div>
            <h1 className="title">Choose Your Climb</h1>
          </div>
          <ChooseOutdoor />
        </div>
      </div>
    );
  
};

export default FindClimbers;
