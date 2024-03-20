import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkFollowUser, thunkUnfollowUser } from "../../store/follow";
import './FollowButton.css'

const FollowButton = (props) => {
    //get user's following list:
    const { user, review } = props;
    const dispatch = useDispatch();
    const following = useSelector(state => state.follow.allFollowing)
    const followed = following[review.user.id] ? true : false;

    useEffect(() => {
        console.log('state changed', following)
    }, [following])

    const follow = () => {
        dispatch(thunkFollowUser(review.user.id))
    }

    const unfollow = () => {
        dispatch(thunkUnfollowUser(review.user.id))
    }
    return (
        <div>
            {!followed && <button className="follow-button" onClick={follow}>Follow</button>}
            {!!followed && <button className="follow-button" onClick={unfollow}>Unfollow</button>}
        </div>
    )
}

export default FollowButton;