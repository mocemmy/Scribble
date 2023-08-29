from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Book, Review, List, db
from sqlalchemy import or_, and_
from app.forms import BookForm, EditBookForm
from app.aws_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3
from app.api.auth_routes import validation_errors_to_error_messages
from datetime import datetime

book_routes = Blueprint('books', __name__)


#Get all books:
@book_routes.route('/')
@login_required
def get_books():
    """
    Query for all books ordered by creation date (newest first)
    """
    books = Book.query.order_by(Book.created_at.desc()).all()

    return {'books': [{**book.to_dict(),
                        "review_count": len(book.reviews),
                        "avg_rating": book.avg_rating
                        } for book in books]}

#Get book details
@book_routes.route('/<int:id>/details')
@login_required
def get_book_details(id):
    """
    Query for book details by id
    """

    book = Book.query.get(id)

    return {"book_details": {**book.to_dict(),
                             "review_count": len(book.reviews),
                             "avg_rating": book.avg_rating}}

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

    return {'books': [{**book.to_dict(),
                        "review_count": len(book.reviews),
                        "avg_rating": book.avg_rating
                        } for book in books]}


#Edit book by id
@book_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def edit_book(id):
    book = Book.query.get(id)

    if not book:
        return {"errors": "Book not found"}, 404
    if book.creator_id != current_user.id:
        return {"errors": "Not your book!"}, 403
    
    form = EditBookForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        creator_id = str(form.data['creator_id'])
        author_first_name = str(form.data['author_first_name'])
        author_last_name = str(form.data['author_last_name'])
        title = str(form.data['title'])
        genre = str(form.data['genre'])
        summary = str(form.data['summary'])
        if form.data['book_cover']:
            book_cover = form.data['book_cover']
            book_cover.filename = get_unique_filename(book_cover.filename)
            upload = upload_file_to_s3(book_cover)

            if 'url' not in upload:
                return {"errors": upload}
            url = str(upload['url'])
            remove_file_from_s3(book.book_cover)
            book.book_cover = url

        book.creator_id = creator_id
        book.author_first_name = author_first_name
        book.author_last_name = author_last_name
        book.title = title
        book.genre = genre
        book.summary = summary
        book.updated_at = datetime.now()
        db.session.commit()
        return book.to_dict()
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

#delete book by id
@book_routes.route('/<int:id>/delete', methods=["DELETE"])
@login_required
def delete_book(id):
    """
    Delete a book by its id
    """
    book = Book.query.get(id)
    if not book:
        return {"errors": "Book not found"}, 404
    if book.creator_id != current_user.id:
        return {"errors": "Not Your Book!"}, 403
    
    remove_file_from_s3(book.book_cover)
    
    db.session.delete(book)
    db.session.commit()

    return {"message": "Book was successfuly deleted"}
    
#get reviews for a book by its id
@book_routes.route('/<int:id>/reviews')
@login_required
def book_reviews(id):
    """
    Query for reviews for a book by the book's id
    """
    book = Book.query.get(id)
    if not book:
        return {"errors": "Book not found"}, 404
    
    reviews = Review.query.filter(Review.book_id == id).all()

    return {"reviews": [{**review.to_dict(), "user": {**review.user.to_dict()}} for review in reviews]}

#get review summary for a book by its id
@book_routes.route('/<int:id>/review-information')
@login_required
def review_information(id):
    """
    Query for summary of review information by book id
    """

    book = Book.query.get(id)
    if not book: 
        return {"errors": "Book not found"}, 404
    reviews = Review.query.filter(Review.book_id == id).all()
    if len(reviews) == 0:
        return {"message": "No reviews yet"}
    information = {
        "book_id": id,
        "review_count": len(reviews),
        "avg_rating": sum(review.review_stars for review in reviews) / len(reviews)
    }
    return information


#remove book from all lists of the current user
@book_routes.route('/<int:id>/remove-lists')
@login_required
def remove_from_lists(id):
    """
    Query to remove a book from all of the current user's lists
    """

    lists = List.query.filter(List.creator_id == current_user.id).all()
    for list in lists:
        for list_book in list.books:
            if list_book.id == id:
                list.books.remove(list_book)
    db.session.commit()
    return {"message": "Removed book from all lists"}


#search books
@book_routes.route('/search', methods=['POST'])
@login_required
def search_books():
    """"
    Query for books matching the search terms
    """
    # search phrase from the request body
    search_terms = request.json
    search_words = search_terms.split()

    or_clauses = []
    for word in search_words:
        or_clauses.append(or_(Book.title.ilike(f'%{word}%'), Book.author_first_name.ilike(f'%{word}%'), Book.author_last_name.ilike(f'%{word}%')))

    and_clauses = and_(*or_clauses)
    books = Book.query.filter(and_clauses).all()
    return {'books': [{**book.to_dict(),
                        "review_count": len(book.reviews),
                        "avg_rating": book.avg_rating
                        } for book in books]}
    