import { Link } from "react-router-dom/cjs/react-router-dom.min"

const FollowingList = () => {
    return (
        <>
            <div>Following Users:</div>
            <Link to='/app/profile'>Return to profile</Link>
        </>
    )
}

export default FollowingList