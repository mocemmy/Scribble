from flask import Blueprint
from flask_login import login_required
from app.models import Book

book_routes = Blueprint('books', __name__)


#Get all books:
@book_routes.route('/')
@login_required
def get_books():
    """
    Query for all books ordered by creation date (newest first)
    """
    books = Book.query.order_by(Book.created_at.desc()).all()

    return {'books': [book.to_dict() for book in books]}

@book_routes.route('/<int:id>/details')
@login_required
def get_book_details(id):
    """
    Query for book details by id
    """

    book = Book.query.get(id)

    return {"book_details": book.to_dict()}