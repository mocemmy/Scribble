import { useDispatch } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { thunkUnfollowUser } from "../../store/follow";

const UserDisplay = ({ user }) => {
    const dispatch = useDispatch();
    const handleUnfollow = () => {
        dispatch(thunkUnfollowUser(user.id))
    }
    return (
        <div className="user-display">
            <Link to={`/app/users/${user.id}`} className="profile-pic-name-container">
                <img className='profile-pic' src={user.profile_pic} alt='pic' />
                <p>{user.first_name} {user.last_name} </p>
            </Link>
            <button className="follow-button" onClick={handleUnfollow}>Unfollow</button>
        </div>
    )
}

export default UserDisplay;