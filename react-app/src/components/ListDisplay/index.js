import { Link } from 'react-router-dom'
import './ListDisplay.css'

function ListDisplay({ list }) {
    let bookList = list.books
    if(bookList.length > 5){
        bookList = bookList.slice(0,5)
    }
    return(
        <>
        <Link to={`/app/lists/${list.id}/details`} className='list-display-container'>
            {bookList.map(book => (
                <img className="list-book-covers" src={book.book_cover} alt='cover' id={book.id}/>
            ))}
            <p>{list.list_name}</p>
        </Link>
        {list.books.length > 1 ? <p className='list-length'>{list.books.length} books</p> : <p className='list-length'>{list.books.length} book</p>}
        </>
    )
}

export default ListDisplay;