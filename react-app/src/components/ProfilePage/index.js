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
        </>
    )
}

export default ProfilePage;