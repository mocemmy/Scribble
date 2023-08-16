from .db import db, environment, SCHEMA, add_prefix_for_prod
from .shelf_books import shelf_books
from datetime import datetime


class Bookshelf(db.Model):
    __tablename__ = 'bookshelves'

    if environment == 'production':
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    shelf_type = db.Column(db.String(50), nullable=False)

    books = db.relationship('Book', secondary=shelf_books, back_populates='shelves')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'books': [{**book.to_dict(), "avg_rating": book.avg_rating, "review_count": len(book.reviews)} for book in self.books],
            'shelf_type': self.shelf_type
        }
