import { Link } from "react-router-dom";
import "./NavBar.css";
import ProfileDropdown from "../ProfileDropdown";

function NavBar() {

  return (
    <>
      <div className="dummy-nav-bar"></div>
      <div className="nav-bar-container">
        <Link className="logo-container" to="/">
          <img
            className="logo"
            src="/images/scribble-logo-transparent.png"
            alt="scribble"
          />
          &nbsp;<h1>Scribble</h1>
        </Link>
        <Link className="nav-bar-links" to="/app/browse-books">
          Browse&nbsp;<span>&#9660;</span>
        </Link>
        <div className="search-bar-container">
          <input type="text" placeholder="Search books" />
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <ProfileDropdown />
      </div>
    </>
  );
}

export default NavBar;
