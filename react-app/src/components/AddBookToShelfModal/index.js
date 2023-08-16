import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { thunkAddBookToShelf, thunkGetBookshelvesCurr, thunkRemoveBookFromAllShelves } from "../../store/bookshelf";
import Loading from "../Loading";


function AddBookToShelfModal({ bookId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const shelves = useSelector(state => state.bookshelves.AllBookshelves)


    useEffect(() => {
        dispatch(thunkGetBookshelvesCurr())
    }, [dispatch])

    if(!shelves) return <Loading />

    const handleAddToShelf = async (e, shelfId) => {
        dispatch(thunkAddBookToShelf(+bookId, shelfId))
    }
    const handleRemoveFromShelves = () => {
        dispatch(thunkRemoveBookFromAllShelves(+bookId))
    }

    return (
        <div>
            <h1 className="modal-title">Choose a shelf for this book</h1>
            {shelves.map(shelf => (
                <button onClick={e => handleAddToShelf(e, shelf.id)} key={shelf.id}>{shelf.shelf_type}</button>
            ))}
            <button onClick={handleRemoveFromShelves}><i className="fa-regular fa-trash-can"></i> Remove from my shelf</button>
        </div>
    )
}   

export default AddBookToShelfModal;