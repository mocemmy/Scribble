import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import Search from "../Search";
import "./NavBar.css";
import BrowseDropdown from "./BrowseDropdown";

function NavBar() {
  return (
    <>
      <div className="dummy-nav-bar"></div>
      <div className="nav-bar-container">
        <Link to="/app/browse-books">
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
        <BrowseDropdown />
        <Search />
        <div className="nav-bar-right-container">
          <a
            title="creator github"
            href="https://github.com/mocemmy"
            target="_blank"
          >
            <i class="fa-brands fa-github"></i>
          </a>
          <a
            title="creator linkedin"
            href="https://www.linkedin.com/in/emily-morgan-7761b1155"
            target="_blank"
          >
            <i class="fa-brands fa-linkedin"></i>
          </a>
          <ProfileDropdown />
        </div>
      </div>
    </>
  );
}

export default NavBar;
