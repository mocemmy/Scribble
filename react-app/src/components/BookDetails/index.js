import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
import { useEffect } from "react";
import { thunkGetBookDetails } from "../../store/book";
import './BookDetails.css'


function BookDetails() {
    const { bookId } = useParams()
    const book = useSelector(state => state.books.SingleBook);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetBookDetails(bookId))
    }, [dispatch, bookId])

    if(!book) return <Loading />
    console.log(book)
    return (
        <div className="book-details-page">
            <div className="book-image-container">
                <img src={book.book_cover} alt="book cover"/>
                <p>Want to read</p>
                <p>Rate this book:</p>
            </div>
            <div className="book-info-container">
                <div>
                    <h1>{book.title}</h1>
                    <h3>{book.author_first_name}&nbsp;{book.author_last_name}</h3>
                    <p>rating information: add later</p>
                    <p>{book.summary}</p>
                </div>
            </div>
        </div>
    )
}

export default BookDetails;