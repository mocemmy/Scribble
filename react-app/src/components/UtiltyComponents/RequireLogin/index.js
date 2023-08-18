import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function RequireLogin ({isLoaded}) {
    const user = useSelector(state => state.session.user)
    const history = useHistory()
    if(isLoaded && !user){
        history.push('/')
    }

    return (
        <>
        </>
    )
}

export default RequireLogin;