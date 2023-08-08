from .db import db, environment, SCHEMA, add_prefix_for_prod
from .list_books import list_books
from datetime import datetime


class List(db.Model):
    __tablename__ = 'lists'

    if environment == 'production':
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    creator_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    list_name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)

    books = db.relationship('Book', secondary=list_books, back_populates='lists')

    def to_dict(self):
        return {
            'id': self.id,
            'creator_id': self.creator_id,
            'list_name': self.list_name,
            'description': self.description,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
