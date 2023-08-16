from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Review, db
from app.forms import ReviewForm
from app.api.auth_routes import validation_errors_to_error_messages

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/new', methods=["POST"])
@login_required
def create_review():
    """
    Create a new review
    """
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user_id = form.data['user_id']
        book_id = form.data['book_id']
        review_body = form.data['review_body']
        review_stars = form.data['review_stars']

        #check if user has already reviewed this book:
        already_reviewed = Review.query.filter(Review.book_id == book_id, Review.user_id == user_id).first()
        if already_reviewed is None:
            review = Review(user_id=user_id, book_id=book_id, review_body=review_body, review_stars=review_stars)
            db.session.add(review)
            db.session.commit()

            return review.to_dict(), 201
        else :
            return {"errors": "You've already left a review!"}
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401

@review_routes.route('/<int:id>/edit', methods=["PUT"])
@login_required
def edit_review(id):
    """
    Query to edit a review by its id
    """
    review = Review.query.get(id)

    if not review:
        return {"errors": "Review not found"}, 404
    if current_user.id != review.user_id:
        return {"errors": "Not your review"}, 403
    
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review_body = form.data['review_body']
        review_stars = form.data['review_stars']
        review.review_body = review_body
        review.review_stars = review_stars
        db.session.commit()
    
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@review_routes.route('/<int:id>')
@login_required
def get_single_review(id):
    """
    Query to get a single review by its id
    """

    review = Review.query.get(id)

    if not review:
        return {"errors": "Review not found"}, 404
    
    return review.to_dict()

@review_routes.route('/<int:id>/delete', methods=["DELETE"])
@login_required
def delete_review(id):
    """
    Query to delete a review by its id
    """
    review = Review.query.get(id)

    if not review:
        return {"errors": "Review not found"}, 404
    if review.user_id != current_user.id:
        return {"errors": "Not your review!"}, 403
    
    db.session.delete(review)
    db.session.commit()

    return {"message": "Deleted review successfully"}
