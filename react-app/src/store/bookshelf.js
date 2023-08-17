
const GET_BOOKSHELVES_CURR = 'bookshelves/GET_BOOKSHELVES_CURR'
const GET_BOOKSHELF_DETAILS = 'bookshelves/GET_BOOKSHELF_DETAILS'
const GET_BOOKS_ON_SHELF = 'bookshelves/GET_BOOKS_ON_SHELF'


const actionGetBookshelvesCurr = (bookshelves) => ({
    type: GET_BOOKSHELVES_CURR,
    bookshelves
})

const actionGetBookshelfDetails = (shelf) => ({
    type: GET_BOOKSHELF_DETAILS,
    shelf
})

const actionGetBooksOnShelf = (books) => ({
    type: GET_BOOKS_ON_SHELF,
    books
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

export const thunkGetAllBooksOnShelves = () => async (dispatch) => {
    const response = await fetch('/api/bookshelves/all-books')

    if(response.ok){
        const data = await response.json()
        dispatch(actionGetBooksOnShelf(data.books))
        return data
    } else {
        const errors = response.json()
        return errors
    }
}

export const thunkGetBooksOnShelf = (shelfId) => async (dispatch) => {
    const response = await fetch(`/api/bookshelves/${shelfId}/books`)

    if(response.ok){
        const data = await response.json()
        dispatch(actionGetBooksOnShelf(data.books))
        return data
    } else {
        const errors = await response.json()
        return errors;
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


const initialState = {AllBookshelves: null, SingleBookshelf: null, Books: null}

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
        case GET_BOOKS_ON_SHELF:
            newState = {...state, Books: {}}
            newState.Books = action.books;
            return newState;
        default:
            return state
    }

}