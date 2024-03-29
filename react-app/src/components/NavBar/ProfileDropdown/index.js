import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import * as sessionActions from '../../../store/session'
import Loading from "../../UtiltyComponents/Loading";
import './ProfileDropdown.css'


function ProfileDropdown() {
    const user = useSelector(state => state.session.user)
    const [showUserMenu, setUserMenu] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const ulRef = useRef();

    useEffect(() => {
        if (!showUserMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target))
                setUserMenu(false);
        };

        document.addEventListener("click", closeMenu); //close menu on click anywhere on document exept menu or button

        return () => document.removeEventListener("click", closeMenu);
    }, [showUserMenu]);

    if (!user) return <Loading />

    const logout = async (e) => {
        e.preventDefault();
        await dispatch(sessionActions.logout());
        history.push("/");
        closeMenu();
    };

    const closeMenu = () => setUserMenu(false);

    const toggleMenu = () => {
        showUserMenu ? setUserMenu(false): setUserMenu(true);
    }



    const ulClassName = "userDropdown" + (showUserMenu ? "" : " hidden");

    return (
        <>
            <div className="user-icon-container" onClick={toggleMenu}>
                <img className="user-icon" src='/images/user-ico-light.png' alt='user icon'/>
            </div>

            <ul id="userDropdown" className={ulClassName} ref={ulRef}>
                <li className="userDropdown-li" id="user-first-lastName">
                    <p><Link to='/app/profile' title='Profile Page'>{user.first_name.toUpperCase()} {user.last_name.toUpperCase()}</Link></p>
                </li>
                <li className="userDropdown-li pfpButton">
                    <p><Link to='/app/user'>User Home</Link></p>
                </li>
                <li className="userDropdown-li pfpButton">
                    <p><button className="logout-button" onClick={(e) => logout(e)}>Logout</button></p>
                </li>
            </ul>
        </>
    );
}

export default ProfileDropdown;