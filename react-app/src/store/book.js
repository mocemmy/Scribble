const GET_BOOKS = "books/GET_BOOKS"

const actionGetAllBooks = (books) => ({
    type: GET_BOOKS,
    books
})

export const thunkGetAllBooks = () => async (dispatch) => {
    const response = await fetch()
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
        default:
            return state;
    }
}