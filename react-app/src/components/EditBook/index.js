import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Loading from '../Loading';
import BookForm from '../BookForm';
import { thunkGetBookDetails } from '../../store/book';

function EditBook() {
    const { bookId } = useParams();
    const book = useSelector(state => state.books.SingleBook)
    const [bookFound, setBookFound] = useState(false)
    const dispatch = useDispatch();
    console.log(book)

    useEffect(() => {
        if(bookId){
            async function fetchData() {

                await dispatch(thunkGetBookDetails(bookId))
                setBookFound(true)
            }
            fetchData();
        }
    }, [bookId, dispatch])

    useEffect(() => {
        if(book?.id === bookId){
            setBookFound(true)
        }
    }, [book, bookId])

    if(!book || !bookFound) return <Loading />
    return (
        <BookForm book={book} type="EDIT" />
    )
}

export default EditBook;