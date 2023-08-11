from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Review, db
from app.forms import ReviewForm
from app.api.auth_routes import validation_errors_to_error_messages

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/new', methods=["POST"])
@login_required
def create_review():
    #check if user has already reviewed this book:

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user_id = form.data['user_id']
        book_id = form.data['book_id']
        review_body = form.data['review_body']
        review_stars = form.data['review_stars']

        already_reviewed = Review.query.filter(Review.book_id == book_id, Review.user_id == user_id).first()
        print('*****************************', already_reviewed)
        # review = Review(user_id=user_id, book_id=book_id, review_body=review_body, review_stars=review_stars)
        # db.session.add(review)
        # db.session.commit()

        # return review.to_dict(), 201
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@review_routes.route('/<int:id>/edit')
@login_required
def edit_review():
    pass