const GET_BOOKS = "books/GET_BOOKS"
const GET_BOOK_DETAILS = "books/GET_BOOK_DETAILS"

const actionGetAllBooks = (books) => ({
    type: GET_BOOKS,
    books
})

const actionGetBookDetails = (book) => ({
    type: GET_BOOK_DETAILS,
    book
})

export const thunkGetAllBooks = () => async (dispatch) => {
    const response = await fetch(`/api/books/`)

    if(response.ok){
        const data = await response.json()
        dispatch(actionGetAllBooks(data.books))
        return data
    } else {
        return response
    }
}

export const thunkCreateBook = (data) => async (dispatch) => {
    const response = await fetch(`/api/books/new`, {
		method: "POST",
		body: data
	})

    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetBookDetails(data))
        return data
    } else {
        const errors = await response.json()
        return errors
    }
}

export const thunkGetBookDetails = (bookId) => async (dispatch) => {
    const response = await fetch(`/api/books/${bookId}/details`)

    if(response.ok) {
        const data = await response.json()
        dispatch(actionGetBookDetails(data.book_details))
        return data
    } else {
        return response
    }
}

export const thunkGetBooksCurrUser = () => async (dispatch) => {
    const response = await fetch(`/api/books/current`)

    if(response.ok){
        const data = await response.json()
        dispatch(actionGetAllBooks(data.books))
        return data
    } else {
        return response
    }
}

export const thunkEditBook = (bookId, data) => async (dispatch) => {
    const response = await fetch(`/api/books/${bookId}/edit`, {
		method: "PUT",
		body: data
	})

    if (response.ok) {
        const data = await response.json();
        dispatch(actionGetBookDetails(data))
        return data
    } else {
        const errors = await response.json()
        return errors
    }
}

export const thunkDeleteBook = (bookId) => async (dispatch) => {
    const response = await fetch(`/api/books/${bookId}/delete`, {
        method: "DELETE"
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(thunkGetBooksCurrUser())
        return data
    } else {
        const errors = await response.json()
        return errors
    }
}



const initialState = {AllBooks: null, SingleBook: null}

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_BOOKS:
            newState = {...state, AllBooks: {...state.AllBooks}, SingleBook: {}}
            newState.AllBooks = {}
            action.books.forEach(book => {newState.AllBooks[book.id] = book})
            return newState
        case GET_BOOK_DETAILS:
            newState = {...state, AllBooks:{...state.AllBooks}, SingleBook: {}}
            newState.SingleBook = action.book
            return newState
        default:
            return state;
    }
}