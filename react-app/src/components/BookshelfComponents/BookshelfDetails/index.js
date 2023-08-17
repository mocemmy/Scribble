import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../../UtiltyComponents/Loading";
import { useEffect, useState } from "react";
import { thunkGetBookshelfDetails } from "../../../store/bookshelf";
import BookDisplay from "../../BookComponents/BookDisplay";

function BookshelfDetails() {
  const { shelfId } = useParams();
  const dispatch = useDispatch();
  const bookshelf = useSelector((state) => state.bookshelves.SingleBookshelf);
  const [errors, setErrors] = useState({})
  useEffect(() => {
    const serverErrors = {};
    const fetchData = async () => {
      if (shelfId) {
        const response = await dispatch(thunkGetBookshelfDetails(shelfId));
        if(response.errors) {
            serverErrors.serverErrors = response.errors
            setErrors(serverErrors)
        }
      }
    };
    fetchData();
  }, [dispatch, shelfId]);

  if (!bookshelf && !Object.keys(errors).length) return <Loading />;
  if(Object.keys(errors).length) return <p className="errors">{errors.serverErrors}</p>
  return (
    <>
      <h1 className="form-header">{bookshelf.shelf_type}</h1>
      {!bookshelf.books.length && <p>This bookshelf is empty</p>}
      {!!bookshelf.books.length &&
        bookshelf.books.map((book) => (
          <BookDisplay book={book} key={book.id} />
        ))}
    </>
  );
}

export default BookshelfDetails;
