import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import UserDisplay from "./UserDisplay";
import { thunkUnfollowUser } from "../../store/follow";

const FollowList = ({ type }) => {
    const currUser = useSelector(state => state.session.user)
    const list = type === "FOLLOWING" ? currUser.following : currUser.followers;
    const pageTitle = type === "FOLLOWING" ? "Following Users:" : "Followers:";
    const dispatch = useDispatch();

    const listArr = Object.values(list)

    const handleUnfollow = (user) => {
        dispatch(thunkUnfollowUser(user.id))
    }
    return (
        <div className="follow-list-container">
            <div>{pageTitle}</div>
            <div className="user-list-container">
                {!!listArr.length && listArr.map((user) => (
                    <UserDisplay user={user} handleUnfollow={handleUnfollow} />
                ))}
            </div>
            {!listArr.length && <p>No users yet</p>}
            <Link to='/app/profile'>Return to profile</Link>
        </div>
    )
}

export default FollowList