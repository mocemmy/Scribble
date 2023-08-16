const GET_BOOKSHELVES_CURR = 'bookshelves/GET_BOOKSHELVES_CURR'
const GET_BOOKSHELF_DETAILS = 'bookshelves/GET_BOOKSHELF_DETAILS'


const actionGetBookshelvesCurr = (bookshelves) => ({
    type: GET_BOOKSHELVES_CURR,
    bookshelves
})

const actionGetBookshelfDetails = (shelf) => ({
    type: GET_BOOKSHELF_DETAILS,
    shelf
})

export const thunkGetBookshelvesCurr = () => async (dispatch) => {
    const response = await fetch('/api/bookshelves/')

    if(response.ok){
        const data = await response.json()
        dispatch(actionGetBookshelvesCurr(data.bookshelves))
        return data
    } else {
        return response
    }
}

export const thunkGetBookshelfDetails = (shelfId) => async (dispatch) => {
    const response = await fetch(`/api/bookshelves/${shelfId}`)

    if(response.ok){
        const data = await response.json()
        dispatch(actionGetBookshelfDetails(data))
        return data
    } else {
        const errors = await response.json()
        return errors
    }
}

export const thunkAddBookToShelf = (bookId, shelfId) => async (dispatch) => {
    const response = await fetch(`/api/bookshelves/${shelfId}/add`, {
        method: "POST",
        headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
            book_id: bookId
        })
    })
    if(response.ok){
        const data = await response.json()
        dispatch(thunkGetBookshelvesCurr())
        return data
    } else {
        const errors = await response.json()
        return errors
    }
}

export const thunkRemoveBookFromShelf = (bookId, shelfId) => async (dispatch) => {
    const response = await fetch(`/api/bookshelves/${shelfId}/remove`, {
        method: "POST",
        headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
            book_id: bookId
        })
    })
    if(response.ok) {
        const data = await response.json()
        dispatch(thunkGetBookshelvesCurr())
        return data
    } else {
        const errors = await response.json()
        return errors
    }
}

export const thunkRemoveBookFromAllShelves = (bookId) => async (dispatch) => {
    const response = await fetch(`/api/bookshelves/remove-all`, {
        method: "POST",
        headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
            book_id: bookId
        })
    })
    if(response.ok) {
        const data = await response.json()
        dispatch(thunkGetBookshelvesCurr())
        return data
    } else {
        const errors = await response.json()
        return errors
    }
}


const initialState = {AllBookshelves: null, SingleBookshelf: null}

export default function reducer(state=initialState, action){
    let newState;
    switch(action.type){
        case GET_BOOKSHELVES_CURR:
            newState = {...state, AllBookshelves: {}}
            newState.AllBookshelves = action.bookshelves
            return newState;
        case GET_BOOKSHELF_DETAILS:
            newState = {...state, SingleBookshelf: {}}
            newState.SingleBookshelf = action.shelf
            return newState;
        default:
            return state
    }

}