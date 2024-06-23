//reducer, actions and thunks for user redux
const SET_USER = "user/SET_USER"
const EDIT_USER = "user/EDIT_USER"
//action to set user information
const actionSetUser = (user) => ({
    type: SET_USER,
    user
})

const actionEditUser = (data) => ({
    type: EDIT_USER,
    data
})

//thunk to get user profile information from db

export const thunkGetUserData = () => async (dispatch) => {
    const response = await fetch ('/api/users/current-user')

    if(response.ok) {
        const data = await response.json()
        dispatch(actionSetUser(data))
    }
}

//thunk edit user information
export const thunkEditUserData = (data) => async (dispatch) => {
    const response = await fetch('/api/users/edit-user', {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: data
        }
    )

    if(response.ok) {
        const data = await response.json();
        dispatch(actionEditUser(data))
    }

}


const initialState = {User: null}

export default function reducer(state= initialState, action) {
    let newState;
    switch(action.type){
        case(SET_USER):
            newState = {...state, User: action.user}
            return newState;
        case(EDIT_USER):
            newState = {...state, User: action.data}
        default:
            return state
    }
}