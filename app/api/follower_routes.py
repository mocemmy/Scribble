from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, db


follower_routes = Blueprint('followers', __name__)

#Get followers for current user:

@follower_routes.route('/')
@login_required
def get_followers():
    """
    Query for all followers for the logged in user
    """
    followers = current_user.followers
    print('***************************', followers)
    return { "followers": 'test'}

#Get followers for a user by their id:
@follower_routes.route('/<int:id>/followers')
def get_followers_by_id(id):
    """
    Query to get followers of a user by their id
    """
    user = User.query.get(id)
    if not user: 
        return {"errors": "User not found"}, 404
    
    return {"followers": [follower.to_dict() for follower in user.followers]}
    


#Follow a user by id
@follower_routes.route('/<int:id>/follow', methods=['POST'])
@login_required
def follow_user(id):
    """
    Follow a user by their id
    """
    following = User.query.get(id)
    follower = User.query.get(current_user.id)
    #check user exists
    if not following:
        return {"errors": f"User {id} not found"}, 404
    #check user isn't trying to follow themselves
    if current_user.id == following.id:
        return {"errors": "Cannot follow yourself!"}, 404
    #check current user isn't already following the requested user
    if current_user in following.followers:
        return {"errors": "You are already following this user"}, 404
    following.followers.append(follower)
    db.session.commit()
    return following.to_dict()

#Unfollow a user by id
@follower_routes.route('/<int:id>/unfollow', methods=['POST'])
@login_required
def unfollow_user(id):
    """
    Unfollow a user by their id
    """

    return {"message": f"Unfollowed user {id}"}