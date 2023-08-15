const GET_LISTS = 'lists/GET_LISTS'
const GET_LIST_DETAILS = 'lists/GET_LIST_DETAILS'

const actionGetAllLists = (lists) => ({
    type: GET_LISTS,
    lists
})

const actionGetListDetails = (list) => ({
    type: GET_LIST_DETAILS,
    list
})

export const thunkGetAllLists = () => async (dispatch) => {
    const response = await fetch('/api/lists/')
    if(response.ok){
        const data = await response.json()
        dispatch(actionGetAllLists(data.lists))
    } else {
        return response
    }
}

export const thunkGetListDetails = (listId) => async (dispatch) => {
    const response = await fetch(`/api/lists/${listId}`)

    if(response.ok) {
        const data = await response.json()
        dispatch(actionGetListDetails(data))
        return data
    } else {
        return response
    }
}


const initialState = {AllLists: null, SingleList: null, SearchLists: null}

export default function reducer(state = initialState, action) {
    let newState;
    switch(action.type){
        case GET_LISTS:
            newState = {...state, AllLists: {}, SingleList: null, SearchLists: null}
            action.lists.forEach(list => newState.AllLists[list.id] = list)
            return newState;
        case GET_LIST_DETAILS:
            newState = {...state, AllLists: null, SingleList: {}, SearchLists: null}
            newState.SingleList = action.list
            return newState;
        default:
            return state
    }
}