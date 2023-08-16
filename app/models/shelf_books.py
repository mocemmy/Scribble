from .db import db, environment, SCHEMA, add_prefix_for_prod

shelf_books = db.Table(
    'shelf_books',
    db.Model.metadata,
    db.Column('id', db.Integer, primary_key=True, autoincrement=True),
    db.Column('bookshelf_id', db.Integer, db.ForeignKey(add_prefix_for_prod('bookshelves.id'))),
    db.Column('book_id', db.Integer, db.ForeignKey(add_prefix_for_prod('books.id')))
)

if environment == "production":
    shelf_books.schema = SCHEMA