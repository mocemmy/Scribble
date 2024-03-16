import { useSelector } from "react-redux";

const ProfilePage = () => {
    //user information displayed:
    const user = useSelector(state => state.session.user)
    return (
        <>
            <h1>{user.first_name} {user.last_name}</h1>
        </>
    )
}

export default ProfilePage;