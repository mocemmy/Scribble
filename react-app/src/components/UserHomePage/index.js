import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loading from '../Loading';
import { thunkGetBooksCurrUser } from '../../store/book';
import BookDisplay from '../BookDisplay';


function UserHomePage() {
    const history = useHistory();
    const books = useSelector(state => state.books.AllBooks)
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(thunkGetBooksCurrUser());
    }, [dispatch])
    
    if(!books) return <Loading />
    const booksArr = Object.values(books)
    const handleCreateNewBook = () => {
        history.push('/app/create-book')
    }

  return (
    <>
        <button onClick={handleCreateNewBook}>Create New Book</button>
      <h1>Your books</h1>
      {booksArr.map(book => (
        <BookDisplay key={book.id} book={book} type="OWNED" />
      ))}
    </>
  );
}

export default UserHomePage;
