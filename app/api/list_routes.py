from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, List, Book
from sqlalchemy import or_, and_
# from app.api.auth_routes import validation_errors_to_error_messages_dict
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
    print('*************************', lists)
    return {"lists": [list.to_dict() for list in lists]}

#get list details:
@list_routes.route('/<int:id>')
@login_required
def get_list_details(id):
    """
    Query for list details by list id
    """
    list = List.query.get(id)

    return list.to_dict()


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