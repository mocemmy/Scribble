import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function RequireLogin ({isLoaded}) {
    const user = useSelector(state => state.session.user)
    const history = useHistory()
    if(isLoaded && !user){
        window.alert("You must be logged in to view this page")
        history.push('/')
    }

    return (
        <>
        </>
    )
}

export default RequireLogin;