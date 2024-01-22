const SEARCH_LISTS = "SEARCH_LISTS";
const SEARCH_BOOKS = "SEARCH_BOOKS";

const actionSearchLists = (lists) => ({
    type: SEARCH_LISTS,
    lists
})

const actionSearchBooks = (books) => ({
    type: SEARCH_BOOKS,
    books
})

export const thunkSearchLists = (search) => async dispatch => {
    const response = await fetch('/api/lists/search', {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(search)        
    }) 

    if(response.ok){
        const data = await response.json()
        dispatch(actionSearchLists(data.lists))
        return data.lists
    } else {
        const data = await response.json()
        return data
    }
}

export const thunkSearchBooks = (search) => async dispatch => {
    const response = await fetch('/api/books/search', {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(search)        
    }) 

    if(response.ok){
        const data = await response.json()
        dispatch(actionSearchBooks(data.books))
        return data.books
    } else {
        const data = await response.json()
        return data
    }
}

const initialState = {searchedBooks: null, searchedLists: null}

export default function reducer(state = initialState, action) {
    let newState;
    switch(action.type) {
        case SEARCH_LISTS:
            newState = {...state, searchedLists: action.lists}
            return newState
        case SEARCH_BOOKS:
            newState = {...state, searchedBooks: action.books}
            return newState
        default:
            return state
    }
}