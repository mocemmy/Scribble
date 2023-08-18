import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  thunkAddBookToShelf,
  thunkGetBookshelfDetails,
  thunkGetBookshelvesCurr,
  thunkRemoveBookFromShelf,
} from "../../../store/bookshelf";
import Loading from "../../UtiltyComponents/Loading";
import "./AddToBookshelf.css";
import OpenModalButton from "../../OpenModalButton";
import { useModal } from '../../../context/Modal';
import AddBookToShelfModal from "../../BookshelfComponents/AddBookToShelfModal";
import { findCurrShelf } from "../../UtiltyComponents/helperFuncs";

function AddToBookshelf({ bookId, type = "" }) {
  const dispatch = useDispatch();
  const [toggleAdded, setToggleAdded] = useState(false);
  const [currShelf, setCurrShelf] = useState()
  const [tbr, setTbr] = useState()
  const bookshelves = useSelector((state) => state.bookshelves.AllBookshelves);

  const { setModalContent } = useModal();

  useEffect(() => {
    if (bookshelves) {
      const shelves = Object.values(bookshelves)
      const curr = findCurrShelf(shelves, bookId)
      setCurrShelf(curr)
      const found = shelves.find((shelf) => shelf.shelf_type === "Want to Read")
      setTbr(found);
      if(found){
        if(found.books.find((book) => +bookId === book.id)){
          setToggleAdded(true)
        } else setToggleAdded(false)
      }
    }
  }, [bookshelves, bookId]);

  useEffect(() => {
    dispatch(thunkGetBookshelvesCurr());
  }, []);


  if (!bookshelves) return <Loading />;

  const handleToggleTBR = async () => {
    if (toggleAdded && tbr) {
      await dispatch(thunkRemoveBookFromShelf(bookId, tbr.id));
    } else if (!toggleAdded && tbr) {
      await dispatch(thunkAddBookToShelf(bookId, tbr.id));
    }
    if(tbr) dispatch(thunkGetBookshelfDetails(tbr.id))
  };
  const alreadyAdded = toggleAdded ? "want-to-read-main added" : "want-to-read-main";

  const openModal = () => {
    setModalContent(<AddBookToShelfModal bookId={bookId} currShelf={currShelf} />)
  }

  return (
    <>
      <div className={`want-to-read-div ${type}`}>
        {!toggleAdded && (!currShelf || currShelf === "Want to Read") && (
          <button onClick={handleToggleTBR} className={alreadyAdded}>
            Want to Read
          </button>
        )}
        {toggleAdded && (
          <button onClick={handleToggleTBR} className={alreadyAdded}>
            <i className="fa-solid fa-check"></i> Want to Read
          </button>
        )}
        {!toggleAdded && currShelf && currShelf !== "Want to Read" && <button className="want-to-read-main added" onClick={openModal}><i className="fa-solid fa-check"></i> {currShelf}</button>}
        <OpenModalButton
          className="want-to-read"
          buttonText="&#9660;"
          modalComponent={
            <AddBookToShelfModal bookId={bookId} currShelf={currShelf} />
          }
        />
      </div>
    </>
  );
}

export default AddToBookshelf;
