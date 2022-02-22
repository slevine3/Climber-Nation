import { Link } from "react-router-dom";
import outdoor from "./outdoor.PNG";

export const ChooseOutdoor = () => {
  return (
    <div className="outdoor_container">
      <div>
        <Link to={`/search-outdoor`}>
          <img className="outdoor_image" src={outdoor} alt="outdoor"></img>
        </Link>
      </div>
      <div>
        <h2>Climb Outdoor</h2>
      </div>
    </div>
  );
};
