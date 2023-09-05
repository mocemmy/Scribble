import { useDispatch, useSelector } from "react-redux";
import Loading from "../../UtiltyComponents/Loading";
import { useEffect, useState } from "react";
import { thunkGetAllBooks } from "../../../store/book";
import BookDisplay from "../../BookComponents/BookDisplay";
import { thunkGetBookshelvesCurr } from "../../../store/bookshelf";
import ReactPaginate from "react-paginate";
import './BrowseBooks.css'


function BrowseBooks() {
  const books = useSelector((state) => state.books.AllBooks);
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const booksPerPage = 20;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkGetAllBooks());
    dispatch(thunkGetBookshelvesCurr());
  }, [dispatch]);

  useEffect(() => {
    if (books) {
      const booksArr = Object.values(books).reverse();
      setTotalPages(Math.ceil(booksArr.length / booksPerPage));
    }
  }, [books]);
  if (!books) return <Loading />;
  const booksArr = Object.values(books).reverse();

  const handlePageChange = (selectedPage) => {
    setCurrPage(selectedPage.selected);
  };

  const startIndex = currPage * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const subset = booksArr.slice(startIndex, endIndex);

  return (
    <div>
      <div className="pagination-container">
        <ReactPaginate
          pageCount={totalPages}
          onPageChange={handlePageChange}
          forcePage={currPage}
        />
      </div>
      {!!subset.length &&
        subset.map((book) => <BookDisplay key={book.id} book={book} />)}
      {!subset.length && <h4>No books to browse!</h4>}
      <div className="pagination-container">
        <ReactPaginate
          pageCount={totalPages}
          onPageChange={handlePageChange}
          forcePage={currPage}
        />
      </div>
    </div>
  );
}

export default BrowseBooks;
