from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Bookshelf(db.Model):
    __tablename__ = 'bookshelves'

    if environment == 'production':
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    book_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('books.id')))
    shelf_type = db.Column(db.String(50), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'book_id': self.book_id,
            'book_id': self.book_id,
            'shelf_type': self.shelf_type
        }
