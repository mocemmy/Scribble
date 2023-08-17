const GET_LISTS = 'lists/GET_LISTS'
const GET_LIST_DETAILS = 'lists/GET_LIST_DETAILS'
const SET_SEARCH_LISTS = 'lists/SET_SEARCH_LISTS'

const actionGetAllLists = (lists) => ({
    type: GET_LISTS,
    lists
})

const actionGetListDetails = (list) => ({
    type: GET_LIST_DETAILS,
    list
})

const actionSetSearchResults = (lists) => ({
    type: SET_SEARCH_LISTS,
    lists
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

export const thunkGetListsCurrUser = () => async (dispatch) => {
    const response = await fetch('/api/lists/curr')

    if(response.ok) {
        const data = await response.json()
        dispatch(actionGetAllLists(data.lists))
        return data
    } else {
        return response
    }
}

export const thunkCreateList = (data) => async (dispatch) => {
    const response = await fetch('/api/lists/new', {
        method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
            list_name: data.list_name,
            description: data.description,
            creator_id: data.creator_id
        })
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(thunkGetListsCurrUser())
        return data
    } else {
        return response
    }
}

export const thunkEditList = (data, listId) => async (dispatch) => {
    const response = await fetch(`/api/lists/${listId}/edit`, {
        method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
            list_name: data.list_name,
            description: data.description,
            creator_id: data.creator_id
        })
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(thunkGetListsCurrUser())
        return data
    } else {
        return response
    }
}

export const thunkDeleteList = (listId) => async (dispatch) => {
    const response = await fetch(`/api/lists/${listId}/delete`, {
        method: "DELETE"
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(thunkGetListsCurrUser())
        return data
    } else {
        return response
    }
}

export const thunkRemoveBookFromList = (bookId, listId) => async (dispatch) => {
    const response = await fetch(`/api/lists/${listId}/remove`, {
        method: "POST",
        headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
            book_id: bookId
        })
    })

    if(response.ok) {
        const data = await response.json();
        dispatch(thunkGetListDetails(listId))
        return data
    } else {
        return response;
    }
}

export const thunkAddBookToList = (bookId, listId) => async (dispatch) => {
    const response = await fetch(`/api/lists/${listId}/add`, {
        method: "POST",
        headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
            book_id: bookId
        })
    })

    if(response.ok) {
        const data = await response.json();
        dispatch(thunkGetListDetails(listId))
        return data
    } else {
        return response;
    }
}

export const thunkRemoveBookAllLists = (bookId) => async (dispatch) => {
    const response = await fetch(`/api/books/${bookId}/remove-lists`)

    if (response.ok){
        const data = await response.json()
        dispatch(thunkGetListsCurrUser())
        return data
    } else {
        const errors = await response.json()
        return errors;
    }
}

export const thunkSearchLists = (search) => async (dispatch) => {
    const response = await fetch('/api/lists/search', {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(search)        
    })

    if(response.ok){
        const data = await response.json()
        dispatch(actionSetSearchResults(data.lists))
    }
}




const initialState = {AllLists: null, SingleList: null, SearchLists: null}

export default function reducer(state = initialState, action) {
    let newState;
    switch(action.type){
        case GET_LISTS:
            newState = {...state, AllLists: {} }
            action.lists.forEach(list => newState.AllLists[list.id] = list)
            return newState;
        case GET_LIST_DETAILS:
            newState = {...state, SingleList: {} }
            newState.SingleList = action.list
            return newState;
        case SET_SEARCH_LISTS:
            newState = {...state, SearchLists: {}}
            action.lists.forEach(list => newState.SearchLists[list.id] = list)
            return newState;
        default:
            return state
    }
}