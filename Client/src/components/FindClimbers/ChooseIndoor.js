import indoor from "./indoor.jpg";
import { Link } from "react-router-dom";
import { SearchIndoor } from "./SearchIndoor";
export const ChooseIndoor = () => {
  return (
    <div className="indoor_container">
      <div>
        <Link to="/search-indoor">
          <img className="indoor_image" src={indoor} alt="indoor"></img>
        </Link>
      </div>
      <div>
        <h2>Climb Indoor</h2>
      </div>
    </div>
  );
};
