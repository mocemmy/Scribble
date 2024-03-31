import { useSelector } from "react-redux"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

const FollowList = ({ type }) => {
    const user = useSelector(state => state.session.user)
    const list = type === "FOLLOWING" ? user.following : user.followers;
    console.log(list)

    return (
        <>
            <div>Following Users:</div>
            <Link to='/app/profile'>Return to profile</Link>
        </>
    )
}

export default FollowList