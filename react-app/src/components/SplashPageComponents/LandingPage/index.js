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
      <div className="body-container">
        <div className="discovery-container">
          <h3>What will you discover?</h3>
          <div className="book-main-container">
            <div>
              <p>Because Brian liked:</p>
              <div className="book-container">
                <img src="/images/catching-fire-cover.jpg" alt="book" />
                <img src="/images/mockingjay-cover.jpg" alt="book" />
                <img src="/images/the-lightning-thief-cover.jpg" alt="book" />
                <img src="/images/the-titans-curse-cover.jpg" alt="book" />
                <i className="fa-solid fa-arrow-right-long"></i>
              </div>
            </div>
            <div>
              <p>He discovered:</p>
              <div className="book-container">
                <img src="/images/a-deadly-education-cover.jpg" alt="book" />
              </div>
            </div>
          </div>
          <div className="book-main-container">
            <div>
              <p>Because Laura liked:</p>
              <div className="book-container">
                <img src="/images/a-deadly-education-cover.jpg" alt="book" />
                <img src="/images/the-hunger-games-cover.jpg" alt="book" />
                <img src="/images/catching-fire-cover.jpg" alt="book" />
                <img src="/images/pride-and-prejudice-cover.jpg" alt="book" />
                <i className="fa-solid fa-arrow-right-long"></i>
              </div>
            </div>
            <div>
              <p>She discovered:</p>
              <div className="book-container">
                <img src="/images/emma-cover.jpg" alt="book" />
              </div>
            </div>
          </div>
        </div>
        <div className="quote-container">
          <h3>Quotes:</h3>
          <p className="quote">
            “From that time on, the world was hers for the reading. She would
            never be lonely again, never miss the lack of intimate friends.
            Books became her friends and there was one for every mood.”
            <span>- Betty Smith, A Tree Grows in Brooklyn</span>
          </p>
          <p className="quote">
          “All human wisdom is summed up in these two words – ‘Wait and hope.’”
            <span>- Alexandre Dumas, The Count of Monte Cristo</span>
          </p>
          <p className="quote">
          “We were the people who were not in the papers. We lived in the blank white spaces at the edges of print. It gave us more freedom. We lived in the gaps between the stories.”
            <span>- Margaret Atwood, The Handmaid's Tale</span>
          </p>
        </div>
      </div>
      <div className="footer-container">
        <div>
          <h3>Creator</h3>
          <Link onClick={(e) => window.alert("Feature coming soon!")} to="/">
            About us
          </Link>
        </div>
        <div>
          <h3>Connect</h3>
          <div className="links-container">
            <a href="https://github.com/mocemmy" target="_blank" rel='noreferrer'>Github</a>
            <a href="http://www.linkedin.com/in/emily-morgan-7761b1155" target="_blank" rel='noreferrer'>
              Linkedin
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
export default LandingPage;
