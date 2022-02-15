import { NavBar } from "./NavBar";
import { connect } from "react-redux";
const Home = (props) => {
  const first_name = localStorage.getItem('first_name')
  return (
    <div>
      <NavBar />
      <div>
        <h1>Welcome {}</h1>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(Home);
