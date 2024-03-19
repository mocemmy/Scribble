const GET_FOLLOWING = 'follow/GET_FOLLOWING';
const FOLLOW_USER = 'follow/FOLLOW_USER'
const UNFOLLOW_USER = 'follow/UNFOLLOW_USER'

const actionGetFollowing = (following) => ({
    type: GET_FOLLOWING,
    following
})

const actionFollowUser = (user) => ({
    type: FOLLOW_USER,
    user
})

const actionUnfollowUser = (userId) => ({
    type: UNFOLLOW_USER,
    userId
})

export const thunkGetFollowing = () => async dispatch => {
    const response = await fetch('/api/auth/')

    if(response.ok){
        const data = await response.json();
        dispatch(actionGetFollowing(data.following))
        return data
    } else {
        const errors = await response.json()
        return errors
    }
}

export const thunkFollowUser = (userId) => async dispatch => {
    const response = await fetch(`/api/followers/${userId}/follow`, {method: "POST"})

    if(response.ok){
        const data = await response.json();
        dispatch(actionFollowUser(data.user))
        return data
    } else {
        const errors = await response.json()
        return errors
    }
}

export const thunkUnfollowUser = (userId) => async dispatch => {
    const response = await fetch(`/api/followers/${userId}/unfollow`, {method: "POST"})

    if(response.ok){
        const data = await response.json()
        dispatch(actionUnfollowUser(userId))
        return data
    } else {
        const errors = await response.json()
        return errors;
    }

}

const initialState = {allFollowers: null, allFollowing: null};
export default function reducer(state = initialState, action) {
    let newState;
    switch(action.type){
        case GET_FOLLOWING:
            newState = {...state, allFollowing: action.following}
            return newState;
        case FOLLOW_USER:
            newState = {...state, allFollowing: {} }
            newState.allFollowing[action.user.id] = action.user
            return newState
        case UNFOLLOW_USER:
            newState = {...state, allFollowing: {} }
            delete newState.allFollowing[action.userId]
            return newState
        default:
            return state;
    }
}