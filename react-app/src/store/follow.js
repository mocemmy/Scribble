const GET_FOLLOWING = 'follow/GET_FOLLOWING';

const actionGetFollowing = (following) => ({
    type: GET_FOLLOWING,
    following
})

export const thunkGetFollowing = () => async dispatch => {
    const response = await fetch('/api/followers/following')

    if(response.ok){
        const data = await response.json();
        dispatch(actionGetFollowing(data.following))
        return data
    } else {
        const errors = await response.json()
        return errors
    }
}

const initialState = {allFollowers: null, allFollowing: null};
export default function reducer(state = initialState, action) {
    let newState;
    switch(action.type){
        case GET_FOLLOWING:
            newState = {...state, allFollowing: {}}
            action.following.forEach(follow => newState.allFollowing[follow.id] = follow)
            return newState;
        default:
            return state;
    }
}