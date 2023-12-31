import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import OpenModalButton from '../../OpenModalButton'
import ConfirmModal from '../../UtiltyComponents/ConfirmModal'
import { thunkDeleteList } from '../../../store/list';
import './ListDisplay.css'

function ListDisplay({ list, type }) {
    const history = useHistory();
    const dispatch = useDispatch();
    let bookList = list.books
    if(bookList.length > 5){
        bookList = bookList.slice(0,5)
    }

    const handleEditList = () => {
        history.push(`/app/lists/${list.id}/edit`)
    }

    const handleDeleteList = () => {
        dispatch(thunkDeleteList(list.id))
    }

    return(
        <div className='list-item-container'>
        <Link to={`/app/lists/${list.id}/details`} className='list-display-container'>
            {bookList.map(book => (
                <img key={book.id} className="list-book-covers" src={book.book_cover} alt='cover' id={book.id}/>
            ))}
            <p id='list-title'>{list.list_name}</p>
        </Link>
        {list.books.length === 1 ? <p className='list-length'>{list.books.length} book</p> : <p className='list-length'>{list.books.length} books</p>}
        <div id='list-options' className="options-container">
          {type === "OWNED" && (
            <button onClick={handleEditList}>Edit list</button>
          )}
          {type === "OWNED" && (
            <OpenModalButton
              className="button-as-link"
              buttonText={"Delete list"}
              modalComponent={
                <ConfirmModal
                  modalTitle="Are you sure you want to delete your list?"
                  yesHandler={handleDeleteList}
                />
              }
            />
          )}
        </div>
        </div>
    )
}

export default ListDisplay;