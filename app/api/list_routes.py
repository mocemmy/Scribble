from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, List, Book
from sqlalchemy import or_, and_
from app.forms import ListForm
from app.api.auth_routes import validation_errors_to_error_messages
# from datetime import datetime

list_routes = Blueprint('lists', __name__)

#get all lists:
@list_routes.route('/')
@login_required
def get_lists():
    """
    Query for lists ordered by creation date (newest first)
    """

    lists = List.query.order_by(List.created_at.desc()).all()
    return {"lists": [list.to_dict() for list in lists]}

#get list details:
@list_routes.route('/<int:id>')
@login_required
def get_list_details(id):
    """
    Query for list details by list id
    """
    list = List.query.get(id)

    return {**list.to_dict(), "books": [{**book.to_dict(), "review_count": len(book.reviews),
                        "avg_rating": book.avg_rating} for book in list.books]}


#get lists of the current user:
@list_routes.route('/curr')
@login_required
def get_lists_curr_user():
    """"
    Query to get all the lists created by the current user
    """
    lists = List.query.filter(List.creator_id == current_user.id).all()

    return {"lists": [list.to_dict() for list in lists]}


#Create a new list:
@list_routes.route('/new', methods=['POST'])
@login_required
def create_list():
    """
    Create a new list
    """
    form = ListForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        creator_id = form.data['creator_id']
        list_name = form.data['list_name']
        description = form.data['description']

        list = List(creator_id=creator_id, list_name=list_name, description=description)
        db.session.add(list)
        db.session.commit()

        return list.to_dict(), 201
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@list_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def edit_list(id):
    """
    Edit a list by its id
    """
    list = List.query.get(id)
    if not list:
        return {"errors": "List not found"}, 404
    if list.creator_id != current_user.id:
        return {"errors": "Not your list!"}, 403
    
    form = ListForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        list_name = form.data['list_name']
        description = form.data['description']

        list.list_name = list_name
        list.description = description

        db.session.commit()

        return list.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401



#delete a list by its id:
@list_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_list(id):
    """
    Delete a list by its id
    """
    list = List.query.get(id)
    if not list:
        return {"errors": "List not found"}, 404
    if list.creator_id != current_user.id:
        return {"errors": "Not your list!"}, 403
    db.session.delete(list)
    db.session.commit()

    return {"message": "Successfully deleted list"}


#Add a book to a list by its id
@list_routes.route('/<int:id>/add', methods=['POST'])
@login_required
def add_books_to_list(id):
    """
    Add a book to a list by its id
    """
    list = List.query.get(id)
    if not list:
        return {"errors": "List not found"}, 404
    if list.creator_id != current_user.id:
        return {"errors": "Not your list!"}, 403
    data = request.json
    book_id = data['book_id']
    book = Book.query.get(book_id)
    if not book:
        return {"errors": "Book not found"}, 404
    list.books.append(book)
    db.session.commit()
    return list.to_dict()


#Remove book from a list by the list id
@list_routes.route('/<int:id>/remove', methods=['POST'])
@login_required
def remove_books_from_list(id):
    """
    Remove book from a list by the list id
    """
    list = List.query.get(id)
    if not list:
        return {"errors": "List not found"}, 404
    if list.creator_id != current_user.id:
        return {"errors": "Not your list!"}, 403
    data = request.json
    book = Book.query.get(data['book_id'])
    if not book:
        return {"errors": "Book not found"}, 404
    for list_book in list.books:
        if list_book.id == book.id:
            list.books.remove(list_book)
            db.session.commit()
            return {"message": "Book removed from list"}
        
    return {"errors": "book is not in the list"}



#search lists
@list_routes.route('/search', methods=['POST'])
@login_required
def search_lists():
    """"
    Query for lists matching the search terms
    """
    search_terms = request.json
    search_words = search_terms.split()

    or_clauses = []
    for word in search_words:
        or_clauses.append(or_(List.list_name.ilike(f'%{word}%'), List.description.ilike(f'%{word}%')))

    and_clauses = and_(*or_clauses)
    lists = List.query.filter(and_clauses).all()
    return {'lists': [list.to_dict() for list in lists]}