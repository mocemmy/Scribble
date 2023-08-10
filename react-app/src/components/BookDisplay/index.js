import { Link } from 'react-router-dom'

function BookDisplay({ book }) {

    console.log(book)
    return(
        <Link to={`/app/books/${book.id}/details`} className="book-container">
            <img src={book.book_cover} alt="book cover"/>
            <p>{book.title}</p>
            <p>{book.author_first_name}&nbsp;{book.author_last_name}</p>
        </Link>
    )
}

export default BookDisplay;