import { useSelector } from "react-redux"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import UserDisplay from "./UserDisplay";

const FollowList = ({ type }) => {
    const currUser = useSelector(state => state.session.user)
    const list = type === "FOLLOWING" ? currUser.following : currUser.followers;

    const listArr = Object.values(list)
    console.log(listArr)
    return (
        <div className="follow-list-container">
            <div>Following Users:</div>
            <div className="user-list-container">
                {listArr.map( (user) => (
                    <UserDisplay user={user} />
                ))}
            </div>
            <Link to='/app/profile'>Return to profile</Link>
        </div>
    )
}

export default FollowList