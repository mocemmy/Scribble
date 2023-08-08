from .db import db, environment, SCHEMA, add_prefix_for_prod

list_books = db.Table(
    'list_books',
    db.Model.metadata,
    db.Column('id', db.Integer, primary_key=True, autoincrement=True),
    db.Column('book_id', db.Integer, db.ForeignKey(add_prefix_for_prod('books.id'))),
    db.Column('list_id', db.Integer, db.ForeignKey(add_prefix_for_prod('lists.id')))
)

if environment == "production":
    list_books.schema = SCHEMA
