import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import {
  thunkAddBookToShelf,
  thunkGetBookshelvesCurr,
  thunkRemoveBookFromAllShelves,
} from "../../../store/bookshelf";
import Loading from "../../UtiltyComponents/Loading";

function AddBookToShelfModal({ bookId, currShelf }) {
  const dispatch = useDispatch();
  const shelves = useSelector((state) => state.bookshelves.AllBookshelves);
  const { closeModal } = useModal();

  useEffect(() => {
    dispatch(thunkGetBookshelvesCurr());
  }, [dispatch]);

  if (!shelves) return <Loading />;

  const handleAddToShelf = async (e, shelfId) => {
    dispatch(thunkAddBookToShelf(+bookId, shelfId));
    closeModal();
  };
  const handleRemoveFromShelves = () => {
    dispatch(thunkRemoveBookFromAllShelves(+bookId));
    closeModal();
  };

  const handleCancel = () =>{
    closeModal()
  }

  return (
    <div className="shelf-container">
      <h1 className="add-shelf-title">Choose a shelf for this book</h1>
      <div className="buttons-container">
        {shelves.map((shelf) => (
          <button
            className={currShelf === shelf.shelf_type ? "selected" : "button"}
            onClick={(e) => handleAddToShelf(e, shelf.id)}
            key={shelf.id}
          >
            {shelf.shelf_type}
          </button>
        ))}
        <button className="button-as-link" onClick={handleRemoveFromShelves}>
          <i className="fa-regular fa-trash-can"></i> Remove from my shelf
        </button>
        <button className="shelf-cancel-button" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default AddBookToShelfModal;
