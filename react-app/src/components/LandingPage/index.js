import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <>
      <div className="landing-page-container">
        <div className="landing-page-left">
          <Link className="logo-container" exact to="/">
            <img
              className="logo"
              src="/images/scribble-logo-transparent.png"
              alt="scribble"
            />
            <h1 className="scribble">&nbsp;Scribble</h1>
          </Link>
        </div>
        <div className="banner-container">
          <img id="banner" src="/images/scribble-banner.png" alt="banner" />
        </div>
        <div className="landing-page-right">
          <div className="login-signup-container">
            <Link to="/signup">Sign up with email</Link>
            <p className="already-member">
              Already a member? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
      <div className="discovery-container">
        <h3>What will you discover?</h3>
        <div className="book-container">
          <div>
            <p>Because Brian liked:</p>
            <div className="book-container">
              <img src="/images/default-book-cover.jpg" alt="book" />
              <img src="/images/default-book-cover.jpg" alt="book" />
              <img src="/images/default-book-cover.jpg" alt="book" />
              <img src="/images/default-book-cover.jpg" alt="book" />
            </div>
          </div>
          <div>
            <p>He discovered:</p>
            <img src="/images/default-book-cover.jpg" alt="book" />
          </div>
        </div>
      </div>

      <div className="footer-container">
        <div>
          <h3>Creator</h3>
          <Link to="/">About us</Link>
        </div>
        <div>
          <h3>Connect</h3>
          <div className="links-container">
            <a href="https://github.com/mocemmy">Github</a>
            <a href="http://www.linkedin.com/in/emily-morgan-7761b1155">
              Linkedin
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
export default LandingPage;
