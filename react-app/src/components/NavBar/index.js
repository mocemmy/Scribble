import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store/session";
import './NavBar.css'


function NavBar() {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }
    return (
        <div className="nav-bar-container">
            <Link className="logo-container" to="/">
            <img
              className="logo"
              src="/images/scribble-logo-transparent.png"
              alt="scribble"
            />&nbsp;<h1>Scribble</h1>
            </Link>
            <Link className='nav-bar-links' to='/app/browse-books'>Browse&nbsp;<span>&#9660;</span></Link>
            <div className="search-bar-container">
            <input 
            type='text' placeholder="Search books" />
            <button type='submit'><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <button onClick={handleLogout}>Sign out</button>
        </div>
    )
}

export default NavBar;