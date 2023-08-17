from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Book, Bookshelf, db
from app.api.auth_routes import validation_errors_to_error_messages
from datetime import datetime

bookshelf_routes = Blueprint('bookshelves', __name__)

#Get bookshelves of the current user:
@bookshelf_routes.route('/')
@login_required
def bookshelves_curr():
    """
    Query to get all of the bookshelves of the current user
    """
    bookshelves = Bookshelf.query.filter(Bookshelf.user_id == current_user.id).all()

    return {"bookshelves": [shelf.to_dict() for shelf in bookshelves]}

#get all books on any of the current user's shelves:
@bookshelf_routes.route('/all-books')
@login_required
def all_books_on_shelves():
    """
    Query for all of the books on any of the current user's bookshelves
    """
    bookshelves = Bookshelf.query.filter(Bookshelf.user_id == current_user.id).all()
    books = [shelf.to_dict()['books'] for shelf in bookshelves]
    books_flattened = []
    for shelf_books in books:
        books_flattened.extend(shelf_books)
    return {"books": books_flattened}


#get all books on a shelf by its id:
@bookshelf_routes.route('/<int:id>/books')
@login_required
def get_books_on_shelf(id):
    """
    Query for all of the books on a shelf by its id
    """
    bookshelf = Bookshelf.query.get(id)
    if not bookshelf:
        return {"errors": "Bookshelf not found"}, 404
    if bookshelf.user_id != current_user.id:
        return {"errors": "Not your bookshelf!"}, 403
    
    return {"books": bookshelf.to_dict()['books']}


#Remove a book from all of the current user's shelves:
@bookshelf_routes.route('/remove-all', methods=['POST'])
@login_required
def remove_book_all_shelves():
    """
    Query to remove a book from all of the current user's bookshelves
    """
    data = request.json
    book_id = data['book_id']
    #find the book from the request body
    book = Book.query.get(book_id)
    if not book:
        return {"errors": "Book not found"}, 404
    bookshelves = Bookshelf.query.filter(Bookshelf.user_id == current_user.id).all()

    for shelf in bookshelves:
         for shelf_book in shelf.books:
            if shelf_book.id == book.id:
                shelf.books.remove(shelf_book)
    db.session.commit()
    return {"message": "Book removed from all shelves"}


#Add a book to a bookshelf by the bookshelf's id:
@bookshelf_routes.route('/<int:id>/add', methods=['POST'])
@login_required
def add_book(id):
    """
    Add a book to a bookshelf by its id
    """
    #find the bookshelf by id
    bookshelf = Bookshelf.query.get(id)
    other_shelves = Bookshelf.query.filter(Bookshelf.user_id == current_user.id, Bookshelf.id != id).all()
    if not bookshelf:
        return {"errors": "Bookshelf not found"}, 404
    if bookshelf.user_id != current_user.id:
        return {"errors": "Not your bookshelf!"}, 403
    data = request.json
    book_id = data['book_id']
    #find the book from the request body
    book = Book.query.get(book_id)
    if not book:
        return {"errors": "Book not found"}, 404
    #add the book to the bookshelf
    bookshelf.books.append(book)

    #remove the book from any other bookshelves the user has:
    for shelf in other_shelves:
        for shelf_book in shelf.books:
            if shelf_book.id == book.id:
                shelf.books.remove(shelf_book)
    db.session.commit()
    return bookshelf.to_dict()


#Remove a book from a bookshelf by the bookshelf's id:
@bookshelf_routes.route('/<int:id>/remove', methods=['POST'])
@login_required
def remove_book(id):
    """
    Remove a book from a bookshelf by the bookshelf's id
    """
    bookshelf = Bookshelf.query.get(id)
    if not bookshelf:
        return {"errors": "Bookshelf not found"}, 404
    if bookshelf.user_id != current_user.id:
        return {"errors": "Not your bookshelf!"}, 403
    data = request.json
    book_id = data['book_id']
    book = Book.query.get(book_id)
    if not book:
        return {"errors": "Book not found"}, 404
    for shelf_book in bookshelf.books:
        if shelf_book.id == book.id:
            bookshelf.books.remove(shelf_book)
            db.session.commit()
            return {"message": "Book removed from the bookshelf"}
    return {"errors": "book is not on the bookshelf"}



#Get a Bookshelf's details by its id:
@bookshelf_routes.route('/<int:id>')
@login_required
def bookshelf_details(id):
    """
    Query for a bookshelf's details by its id
    """

    bookshelf = Bookshelf.query.get(id)

    if not bookshelf:
        return {"errors": "Bookshelf not found"}, 404
    if bookshelf.user_id != current_user.id:
        return {"errors": "Not your bookshelf"}, 403
    
    return bookshelf.to_dict()