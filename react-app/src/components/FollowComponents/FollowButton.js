import { useEffect } from "react";
import { useSelector } from "react-redux";

const FollowButton = (props) => {
    //get user's following list:
    const { user, review } = props;

    console.log( user.following )
    return(
        <button>Follow</button>
    )
}

export default FollowButton;