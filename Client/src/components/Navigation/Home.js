import { NavBar } from "./NavBar";
import { connect } from "react-redux";
import { SearchUsers } from "../FindClimbers/SearchUsers";
const Home = (props) => {
  const name = localStorage.getItem("name");
  return (
    <div>
      <NavBar />
      <div>
        <h1>Welcome {name}</h1>
      </div>
      <SearchUsers />
    </div>
  );
};

const mapStateToProps = (state) => {
  // console.log(state.newUserLogIn.first_name);
  return {
    // first_name: state.newUserLogIn.first_name
  };
};

export default connect(mapStateToProps)(Home);
