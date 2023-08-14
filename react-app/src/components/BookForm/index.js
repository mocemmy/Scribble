import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import { thunkCreateBook, thunkEditBook } from "../../store/book";
import './BookForm.css'


function BookForm({ type, book }) {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [author_first_name, setAuthorFirstName] = useState(
    book ? book.author_first_name : ""
  );
  const [author_last_name, setAuthorLastName] = useState(
    book ? book.author_last_name : ""
  );
  const [title, setTitle] = useState(book ? book.title : "");
  const [genre, setGenre] = useState(book ? book.genre : "");
  const [summary, setSummary] = useState(book ? book.summary : "");
  const [book_cover, setBookCover] = useState(book ? book.book_cover : "");
  const [currentCover, _setCurrentCover] = useState(book ? book.book_cover: "")
  const [charactersLeft, setCharactersLeft] = useState(5000)
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false)

  useEffect(() => {
    //useEffect to check for form validation errors
    const validationErrors = {};
    if (!author_first_name?.length)
      validationErrors.author_first_name = "Author's first name is required";
    if (author_first_name?.length > 50)
      validationErrors.author_first_name =
        "Author's first name must be shorter than 50 characters";
    if (!author_last_name?.length)
      validationErrors.author_last_name = "Author's last name is required";
    if (author_last_name?.length > 50)
      validationErrors.author_last_name =
        "Author's first name must be shorter than 50 characters";
    if (!title?.length) validationErrors.title = "Book title is required";
    if (title?.length > 50)
      validationErrors.title = "Book title must be shorter than 50 characters";
    if (genre?.length > 50)
      validationErrors.genre = "Genre must be shorter than 50 characters";
    if (summary?.length > 5000)
      validationErrors.genre = "Summary must be shorter than 5000 characters";
    if (!book_cover)
      validationErrors.book_cover = "Please input a cover for your book";

    setErrors(validationErrors);
  }, [author_first_name, author_last_name, title, genre, summary, book_cover, book]);

  let formTitle;
  let buttonText;
  if (type === "CREATE") {
    formTitle = "Create a New Book";
    buttonText = "Create Book";
  } else {
    formTitle = "Edit Book";
    buttonText = "Edit Book";
  }

  const handleCancel = () => {
    history.push('/app/user')
  }
  const onClick = (e) => {
    e.preventDefault();
    setHasSubmitted(true)
    if(type === "CREATE"){
        handleCreate()
    } else {
        handleEdit()
    }
  }
  const handleEdit = async () => {
    if (!Object.keys(errors).length){
        const formData = new FormData();
        if(book_cover !== currentCover){ //book cover was changed
            formData.append('book_cover', book_cover)
        }
        formData.append('author_first_name', author_first_name)
        formData.append('author_last_name', author_last_name)
        formData.append('title', title)
        formData.append('genre', genre)
        formData.append('summary', summary)
        formData.append('creator_id', user.id)
        
        const response = await dispatch(thunkEditBook(book.id, formData));
        if (response.id) {
            history.push(`/app/books/${response.id}/details`)
        } else {
            setErrors({"serverErrors": response})
        }
    }
  }

  const handleSummary = (e) => {
    const summary = e.target.value;

    const characterCount = summary.length;
    setCharactersLeft(5000 - characterCount)
    setSummary(summary);
    
  }

  const handleCreate = async () => {
    if (!Object.keys(errors).length){
        const formData = new FormData();
        formData.append('book_cover', book_cover)
        formData.append('author_first_name', author_first_name)
        formData.append('author_last_name', author_last_name)
        formData.append('title', title)
        formData.append('genre', genre)
        formData.append('summary', summary)
        formData.append('creator_id', user.id)
        
        const response = await dispatch(thunkCreateBook(formData));
        if (response.id) {
            history.push(`/app/books/${response.id}/details`)
        } else {
            setErrors({"serverErrors": response})
        }
    }
  }

  return (
    <div className="book-form-container">
      <form encType="multipart/form-data" className="book-form">
        <h1 className="form-label">{formTitle}</h1>
        {errors.serverErrors && <p className="errors">{errors.serverErrors}</p>}
        <label htmlFor="author-first-name">Author's first name</label>
        {hasSubmitted && errors.author_first_name && (
          <p className="errors">{errors.author_first_name}</p>
        )}
        <input
          type="text"
          name="author-first-name"
          value={author_first_name}
          onChange={(e) => setAuthorFirstName(e.target.value)}
        />
        <label htmlFor="author-last-name">Author's last name</label>
        {hasSubmitted && errors.author_last_name && (
          <p className="errors">{errors.author_last_name}</p>
        )}
        <input
          type="text"
          name="author-last-name"
          value={author_last_name}
          onChange={(e) => setAuthorLastName(e.target.value)}
        />
        <label htmlFor="title">Book title</label>
        {hasSubmitted && errors.title && <p className="errors">{errors.title}</p>}
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="genre">Book genre</label>
        {hasSubmitted && errors.genre && <p className="errors">{errors.genre}</p>}
        <input
          type="text"
          name="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <label htmlFor="summary">Book summary {charactersLeft >= 0 && charactersLeft < 5000 && <span className="character-count">{charactersLeft}</span>}
                    {charactersLeft < 0 && <span className="character-count-errors">{charactersLeft}</span>}</label>
        {hasSubmitted && errors.summary && <p className="errors">{errors.summary}</p>}
        <textarea
          type="text"
          name="summary"
          value={summary}
          onChange={handleSummary}
        />
        <label htmlFor="book-cover">Book cover</label>
        {hasSubmitted && errors.book_cover && <p className="errors">{errors.book_cover}</p>}
    
        <input
          type="file"
          name="book-cover"
          accept="image/*"
          onChange={(e) => setBookCover(e.target.files[0])}
        />
        <div className="preview-image-container">
        {currentCover && <p>Current Book Cover</p>}
        {currentCover  && <img className="book-cover-preview" src={currentCover} alt={currentCover} />}
        </div>
        <div className="button-container">
          <button className="submit-button cancel-button" onClick={handleCancel}>
            Cancel
          </button>
          <button className="submit-button" onClick={onClick} type="submit">
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookForm;
