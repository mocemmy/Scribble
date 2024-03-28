import { useSelector } from "react-redux";
import './ProfilePage.css'
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ProfilePage = () => {
    //user information displayed:
    const user = useSelector(state => state.session.user)
    console.log(user)
    return (
        <>
            <div className="profile-header">
                <img src={user.profile_pic} />
                <h1>{user.first_name} {user.last_name}</h1>
                
            </div>
            <div className="followers-section">
                <Link to='/app/profile/followers'>Followers: {user.follower_count}</Link>
                <Link to='/app/profile/following'>Following: {user.following_count}</Link>
            </div>
            <div className="bio-section">
                <p>{user.bio ? user.bio : "No bio yet"}</p>
                <button className="edit-bio-button">Edit Bio</button>
            </div>
        </>
    )
}

export default ProfilePage;