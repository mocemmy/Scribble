import { Link } from "react-router-dom/cjs/react-router-dom.min"

const FollowerList = () => {
    return (
        <>
            <div>Followers:</div>
            <Link to='/app/profile'>Return to profile</Link>
        </>
    )
}

export default FollowerList;