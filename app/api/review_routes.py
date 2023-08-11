from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Review, db

review_routes = Blueprint('reviews', __name__)