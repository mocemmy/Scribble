import { Link } from "react-router-dom/cjs/react-router-dom.min";

const UserDisplay = ({ user }) => {
    return (
        <div className="user-display">
            <img className='profile-pic' src={user.profile_pic} alt='pic' />
            <Link to={`/app/users/${user.id}`}>{user.first_name} {user.last_name} </Link>

        </div>
    )
}

export default UserDisplay;