import { Link } from "react-router-dom";
import './BookshelfBookDisplay.css'


function BookshelfBookDisplay ({ book, shelfId }) {
    return (
        <div className="book-container bookshelf-book-container"> 
            <Link to={`/app/books/${book.id}/details`}>
            <img id="book-display-image" src={book.book_cover} alt='cover'/>
            </Link>
            <Link to={`/app/books/${book.id}/details`}>
            <p>{book.title}</p></Link>
            <p>{book.author_last_name}, {book.author_first_name} </p>
            <p>{book.avg_rating.toFixed(2)}</p>
        </div>
    )
}

export default BookshelfBookDisplay;