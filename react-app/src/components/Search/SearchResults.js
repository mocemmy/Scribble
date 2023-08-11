import { useSelector } from "react-redux";
import Loading from "../Loading";
import BookDisplay from "../BookDisplay";
import { useEffect, useState } from "react";

function SearchResults () {
    const books = useSelector(state => state.books.SearchBooks)
    const [searchLoaded, setSearchLoaded] = useState(false)
    useEffect(() => {
        setSearchLoaded(true)
    },[books])

    if(!searchLoaded || !books) return <Loading />
    const booksArr = Object.values(books)
    if(searchLoaded && !booksArr.length) return <h3>No books found</h3>

    return (
        <>
            <h3>Search results:</h3>
            {booksArr.map(book => (
                <BookDisplay key={book.id} book={book} />
            ))}
        </>
    )
}

export default SearchResults;