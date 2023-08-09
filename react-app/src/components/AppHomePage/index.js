import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"


function AppHomePage({ isLoaded }){
    const user = useSelector(state => state.session.user)
    const history = useHistory()

    if(isLoaded && !user) history.push('/')
    return (
        <h1>app home page</h1>
    )
}

export default AppHomePage;