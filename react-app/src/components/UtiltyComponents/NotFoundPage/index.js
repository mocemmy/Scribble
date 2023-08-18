import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./NotFoundPage.css";

function NotFoundPage() {
    const history = useHistory();
    const redirect = () => {
        history.push('/app')
    }

  return (
    <div className="not-found-page-container">
      <div className="not-found-quote-container quote-container">
        <h5>Page-is-Gone, son of Aragorn, grandson of Arathorn</h5>
        <p className="quote">
          "All that is gold does not glitter, Not all those who wander are lost;
          The old that is strong does not wither, Deep roots are not reached by
          the frost. From the ashes a fire shall be woken, A light from the
          shadows shall spring; Renewed shall be blade that was broken, The
          crownless again shall be king."<br></br>
          <span>— J.R.R. Tolkien, The Fellowship of the Ring</span>
        </p>
        <button className='redirect-button' onClick={redirect}>Back to Scribble homepage</button>
      </div>
      <div>
        <img className="book-cover" src='/images/fellowship-of-the-ring-cover.jpg' alt='cover'/>
      </div>
    </div>
  );
}

export default NotFoundPage;
