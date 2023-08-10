from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Book, db
from app.forms import BookForm
from app.aws_helpers import upload_file_to_s3, get_unique_filename
from app.api.auth_routes import validation_errors_to_error_messages

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

#Get book details
@book_routes.route('/<int:id>/details')
@login_required
def get_book_details(id):
    """
    Query for book details by id
    """

    book = Book.query.get(id)

    return {"book_details": book.to_dict()}

#Create new book
@book_routes.route('/new', methods=['POST'])
@login_required
def create_book():
    """
    Create a new book
    """
    form = BookForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        creator_id = str(form.data['creator_id'])
        author_first_name = str(form.data['author_first_name'])
        author_last_name = str(form.data['author_last_name'])
        title = str(form.data['title'])
        genre = str(form.data['genre'])
        summary = str(form.data['summary'])
        book_cover = form.data['book_cover']
        book_cover.filename = get_unique_filename(book_cover.filename)
        upload = upload_file_to_s3(book_cover)

        if 'url' not in upload:
            return {"errors": upload}
        url = str(upload['url'])

        book = Book(creator_id=creator_id, author_first_name=author_first_name, author_last_name=author_last_name, title=title, genre=genre, summary=summary, book_cover=url)

        db.session.add(book)
        db.session.commit()
        return book.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#Get all books created by current user
@book_routes.route('/current')
@login_required
def get_current_users_books():
    """
    Query to get all the books created by the current user
    """

    books = Book.query.filter(Book.creator_id == current_user.id).all()

    return {"books": [book.to_dict() for book in books]}
