import { useSelector } from "react-redux";
import './ProfilePage.css'

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
                <p>Followers: {user.follower_count}</p>
                <p>Following: {user.following_count}</p>
            </div>
            <div className="bio-section">
                <p>{user.bio ? user.bio : "No bio yet"}</p>
                <button className="edit-bio-button">Edit Bio</button>
            </div>
        </>
    )
}

export default ProfilePage;