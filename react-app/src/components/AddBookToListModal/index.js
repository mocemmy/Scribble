import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkAddBookToList, thunkGetListsCurrUser, thunkRemoveBookAllLists } from "../../store/list";
import Loading from "../Loading";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import "./AddBookToListModal.css";

function AddBookToListModal({ bookId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const lists = useSelector((state) => state.lists.AllLists);
  const { closeModal } = useModal();

  useEffect(() => {
    dispatch(thunkGetListsCurrUser());
  }, [dispatch]);

  const handleAdd = async (e, listId, className) => {
    if (className !== "selected") {
      const response = await dispatch(thunkAddBookToList(bookId, listId));
      if (response.id) {
        closeModal();
        history.push(`/app/lists/${listId}/details`);
      }
    } else {
      window.alert("This book is already on this list");
    }
  };

  if (!lists) return <Loading />;
  const listArr = Object.values(lists);
  const alreadyOnListClass = [];
  const alreadyOn = "selected";
  const notAlreadyOn = "button";
  for (const list of listArr) {
    if (list.books.find((book) => book.id === +bookId)) {
      alreadyOnListClass.push(alreadyOn);
    } else {
      alreadyOnListClass.push(notAlreadyOn);
    }
  }

  const handleCancel = () => {
    closeModal();
  };

  const handleRemoveFromLists = () => {
    dispatch(thunkRemoveBookAllLists(bookId))
    closeModal();
  }

  return (
    <div className="shelf-container">
      <h1 className="add-shelf-title">Choose a list for this book</h1>
      <div className="buttons-container">
        {listArr.map((list, idx) => (
          <button
            className="list-button"
            id={alreadyOnListClass[idx]}
            onClick={(e) => handleAdd(e, list.id, alreadyOnListClass[idx])}
            key={list.id}
          >
            {list.list_name}
          </button>
        ))}
        <button className="button-as-link" onClick={handleRemoveFromLists}>
          <i className="fa-regular fa-trash-can"></i> Remove from my lists
        </button>
        <button
          className="cancel-button"
          id="modal-cancel"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddBookToListModal;
