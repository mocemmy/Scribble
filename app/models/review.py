from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'reviews'


    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    book_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('books.id')))
    review_body = db.Column(db.String(255), nullable=False)
    review_stars = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)

    user = db.relationship('User', back_populates='reviews')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'book_id': self.book_id,
            'review_body': self.review_body,
            'review_stars': self.review_stars,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
