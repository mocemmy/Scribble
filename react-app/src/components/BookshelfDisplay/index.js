import { Link } from 'react-router-dom'


function BookshelfDisplay({ shelf }){

    console.log(shelf)
    return (
        <div>
            <Link to={`/app/bookshelves/${shelf.id}/details`}>{shelf.shelf_type}</Link>
        </div>
    )
}

export default BookshelfDisplay;