import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import Search from "../Search";
import "./NavBar.css";

function NavBar() {

  return (
    <>
      <div className="dummy-nav-bar"></div>
      <div className="nav-bar-container">
        <Link to="/">
          <img
            className="logo"
            src="/images/scribble-logo-transparent.png"
            alt="scribble"
          />
          &nbsp;<h1>Scribble</h1>
        </Link>
        <Link className="nav-bar-links" to="/app/my-books">
          My Books
        </Link>
        <Link className="nav-bar-links" to="/app/browse-books">
          Browse Books&nbsp;<span>&#9660;</span>
        </Link>
        <Link className="nav-bar-links" to="/app/browse-lists">
          Browse Lists&nbsp;<span>&#9660;</span>
        </Link>
        <Search />
        <ProfileDropdown />
      </div>
    </>
  );
}

export default NavBar;
