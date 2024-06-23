from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.aws_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3
from app.api.auth_routes import validation_errors_to_error_messages_dict
from app.models import User, db
from app.forms import UserForm
from datetime import datetime

user_routes = Blueprint('users', __name__)

@user_routes.route('/current-user')
@login_required
def get_current_user():
    """
    Query to return user information for logged in user
    """

    return { "user": current_user.to_dict() }


@user_routes.route('/all-users')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}



@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

#patch route for each portion of user information
@user_routes.route('/edit-user', methods=['PATCH'])
@login_required
def edit_user():
    """
    Route to edit user information
    """

    form = UserForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        #profile picture
        profile_pic = form.data['profile_pic']
        #email
        email = form.data['email']
        #password
        password = form.data['password']
        #bio
        bio = form.data['bio']

        if profile_pic:
            profile_pic.filename = get_unique_filename(profile_pic.filename)
            upload = upload_file_to_s3(profile_pic)
            if 'url' not in upload:
                return {'errors': upload}
            remove_file_from_s3(current_user.profile_pic)
            url = str(upload['url'])
            current_user.profile_pic = url
        
        if email:
            current_user.email = email
        
        if password:
            current_user.password = password
        
        if bio:
            current_user.bio = bio
        
        if profile_pic or email or password or bio:
            current_user.updated_at = datetime.now()
        db.session.commit()

        return {"user": current_user.to_dict()}
    
    return {"errors": validation_errors_to_error_messages_dict(form.errors)}, 401
