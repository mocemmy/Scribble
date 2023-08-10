import { useDispatch, useSelector } from 'react-redux'
import Loading from '../Loading';
import { useEffect } from 'react';
import { thunkGetAllBooks } from '../../store/book';
import BookDisplay from '../BookDisplay';

function BrowseBooks() {
    const books = useSelector(state => state.books.AllBooks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkGetAllBooks());
    }, [dispatch])

    if(!books) return <Loading />
    const booksArr = Object.values(books);
    console.log(books)
    return (
        <div>
            {booksArr.map(book => (
                <BookDisplay key={book.id} book={book} />
            ))}
        </div>
    )
}

export default BrowseBooks;