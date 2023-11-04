import { Link } from "react-router-dom";
import CustomNavLink from "./CustomNavLink";
import "../assets/css/NavBar.css";

const NavBar = () => {
  return (
    <nav className="nav">
      <Link className="site-title" to="/">
        <img src="./crud.svg" />
        SD - CRUD
      </Link>
      <ul>
        <CustomNavLink to="/addEvent">Add New Event</CustomNavLink>
        <CustomNavLink to="/viewEvents">View Events</CustomNavLink>
      </ul>
    </nav>
  );
};

export default NavBar;
