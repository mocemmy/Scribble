import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function AppHomePage({ isLoaded }) {
  const user = useSelector((state) => state.session.user);
  const history = useHistory();

  if (isLoaded && !user) history.push("/");
  return (
    <div className="app-home-page">
      <h1>Home page</h1>
      <p>Will show updates from authors and reviewers you are following</p>
    </div>
  );
}

export default AppHomePage;
