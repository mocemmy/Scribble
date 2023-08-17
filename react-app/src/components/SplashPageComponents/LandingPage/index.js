import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../../store/session";
import "./LandingPage.css";

function LandingPage({ isLoaded }) {
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleDemoLogin = () => {
    const demoUser = "jane@aa.io";
    const demoPassword = "password";
    dispatch(sessionActions.login(demoUser, demoPassword));
  };

  if (isLoaded && user) history.push("/app");
  return (
    <>
      <div className="landing-page-container">
        <div className="landing-logo-container">
          <Link to="/">
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
        <div className="login-signup-container">
          <Link to="/signup">Sign up with email</Link>
          <button onClick={handleDemoLogin}>Log in as Demo User</button>
          <p className="already-member">
            Already a member? <Link to="/login">Sign in</Link>
          </p>
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
