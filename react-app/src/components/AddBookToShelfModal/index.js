import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function AddBookToShelfModal({ bookId, shelves }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const handleAddToShelf = (e, shelfId) => {
        window.alert('adding')
    }
    return (
        <div>
            <h1 className="modal-title">Choose a shelf for this book</h1>
            {shelves.map(shelf => (
                <button onClick={e => handleAddToShelf(e, shelf.id)} key={shelf.id}>{shelf.shelf_type}</button>
            ))}
        </div>
    )
}   

export default AddBookToShelfModal;