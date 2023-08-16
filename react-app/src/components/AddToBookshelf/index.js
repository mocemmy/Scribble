import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  thunkAddBookToShelf,
  thunkGetBookshelfDetails,
  thunkGetBookshelvesCurr,
  thunkRemoveBookFromShelf,
} from "../../store/bookshelf";
import Loading from "../Loading";
import "./AddToBookshelf.css";
import OpenModalButton from "../OpenModalButton";
import { useModal } from '../../context/Modal';
import AddBookToShelfModal from "../AddBookToShelfModal";

function AddToBookshelf({ bookId, type = "" }) {
  const dispatch = useDispatch();
  const [toggleAdded, setToggleAdded] = useState(false);
  const [currShelf, setCurrShelf] = useState()
  const bookshelves = useSelector((state) => state.bookshelves.AllBookshelves);

  const { setModalContent, setOnModalClose } = useModal();

  let tbr, shelfArr;
  if (bookshelves) {
    shelfArr = Object.values(bookshelves);
    tbr = shelfArr.find((shelf) => shelf.shelf_type === "Want to Read");
  }

  useEffect(() => {
    if(shelfArr){
        for(const shelf of shelfArr){
            if(shelf.books.find(book => +bookId === book.id)) setCurrShelf(shelf.shelf_type)
        }
    }
  }, [bookshelves])

  useEffect(() => {
    if (bookshelves) {
      shelfArr = Object.values(bookshelves);
      tbr = shelfArr.find((shelf) => shelf.shelf_type === "Want to Read");
    }
  }, [bookshelves]);

  useEffect(() => {
    dispatch(thunkGetBookshelvesCurr());
  }, [dispatch]);

  useEffect(() => {
    if (tbr) {
      if (tbr.books.find((book) => +bookId === book.id)) {
        setToggleAdded(true);
      } else {
        setToggleAdded(false);
      }
    }
  }, [bookshelves]);

  if (!bookshelves) return <Loading />;

  const handleToggleTBR = async () => {
    let response;
    if (toggleAdded && tbr) {
      response = await dispatch(thunkRemoveBookFromShelf(bookId, tbr.id));
    } else if (!toggleAdded && tbr) {
      response = await dispatch(thunkAddBookToShelf(bookId, tbr.id));
    }
    if (response.errors) {
      console.log(response);
    }
    if(tbr) dispatch(thunkGetBookshelfDetails(tbr.id))
  };
  const alreadyAdded = toggleAdded ? "want-to-read added" : "want-to-read";

  const openModal = () => {
    setModalContent(<AddBookToShelfModal bookId={bookId} currShelf={currShelf} />)
  }

  return (
    <>
      <div className={`want-to-read-container ${type}`}>
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
        {!toggleAdded && currShelf && currShelf !== "Want to Read" && <button className="want-to-read added" onClick={openModal}><i className="fa-solid fa-check"></i> {currShelf}</button>}
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
