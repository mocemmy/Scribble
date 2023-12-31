import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loading from "../UtiltyComponents/Loading";
import { thunkGetBooksCurrUser } from "../../store/book";
import BookDisplay from "../BookComponents/BookDisplay";
import "./UserHomePage.css";
import { thunkGetListsCurrUser } from "../../store/list";
import ListDisplay from "../ListComponents/ListDisplay";
import { thunkGetBookshelvesCurr } from "../../store/bookshelf";
import BookshelfDisplay from "../BookshelfComponents/BookshelfDisplay";

function UserHomePage() {
  const history = useHistory();
  const books = useSelector((state) => state.books.AllBooks);
  const lists = useSelector((state) => state.lists.AllLists);
  const bookshelves = useSelector((state) => state.bookshelves.AllBookshelves)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetBooksCurrUser());
    dispatch(thunkGetListsCurrUser());
    dispatch(thunkGetBookshelvesCurr());
  }, [dispatch]);

  if (!books || !lists || !bookshelves) return <Loading />;
  const booksArr = Object.values(books);
  const listArr = Object.values(lists);
  const bookshelfArr = Object.values(bookshelves);
  const handleCreateNewBook = () => {
    history.push("/app/create-book");
  };

  const handleCreateNewList = () => {
    history.push("/app/create-list");
  };

  return (
    <>
     <div className="user-shelf-container">
          <h1 className="bookshelf-header">Your bookshelves:</h1>
          {bookshelfArr.map(shelf => (
            <BookshelfDisplay key={shelf.id} shelf={shelf} />
          ))}
        </div>
    <div className="user-content-container">
        <div className="sub-content-container">
          <h1 className="page-header">Your books <button className="button-as-link" onClick={handleCreateNewBook}>
          Create New Book
        </button></h1>
          {!!booksArr.length &&
            booksArr.map((book) => (
              <BookDisplay key={book.id} book={book} type="OWNED" />
            ))}
          {!booksArr.length && <h4>No books yet!</h4>}
        </div>
        <div className="sub-content-container">
          <h1 className="page-header">Your lists <button className="button-as-link" onClick={handleCreateNewList}>
          Create New List
        </button></h1>
          {!!listArr.length &&
            listArr.map((list) => (
              <ListDisplay type="OWNED" key={list.id} list={list} />
            ))}
        </div>
       
    </div>
    </>
  );
}

export default UserHomePage;
