from .db import db, environment, SCHEMA, add_prefix_for_prod
from .list_books import list_books
from .shelf_books import shelf_books
from sqlalchemy import func
from datetime import datetime
from sqlalchemy.ext.hybrid import hybrid_property


class Book(db.Model):
    __tablename__ = 'books'

    if environment == 'production':
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    creator_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    author_first_name = db.Column(db.String(50), nullable=False)
    author_last_name = db.Column(db.String(50), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    genre = db.Column(db.String(50))
    summary = db.Column(db.String(5000))
    book_cover = db.Column(db.String(1000), default='/images/default-book-cover.jpg')
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)

    lists = db.relationship('List', secondary=list_books, back_populates='books')

    reviews = db.relationship('Review', back_populates='book', cascade='all, delete-orphan')
    shelves = db.relationship('Bookshelf', secondary=shelf_books, back_populates='books')

    @property
    def avg_rating(self):
        if len(self.reviews) > 0:
            return sum(review.review_stars for review in self.reviews) / len(self.reviews)
        else:
            return "No reviews yet"

    def to_dict(self):
        return {
            'id': self.id,
            'creator_id': self.creator_id,
            'author_first_name': self.author_first_name,
            'author_last_name': self.author_last_name,
            'title': self.title,
            'genre': self.genre,
            'summary': self.summary,
            'book_cover': self.book_cover,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
