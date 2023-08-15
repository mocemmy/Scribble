from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.list_books import list_books

def seed_list_books():
    connection = db.engine.connect()
    data = [
        {"book_id": 1, "list_id": 1},
        {"book_id": 2, "list_id": 1},
        {"book_id": 3, "list_id": 1},
        {"book_id": 4, "list_id": 1},
        {"book_id": 5, "list_id": 1},
        {"book_id": 9, "list_id": 1},
        {"book_id": 13, "list_id": 1},
        {"book_id": 14, "list_id": 1},
        {"book_id": 10, "list_id": 1},
        {"book_id": 11, "list_id": 1},
        {"book_id": 12, "list_id": 1},
        {"book_id": 6, "list_id": 2},
        {"book_id": 7, "list_id": 2},
        {"book_id": 1, "list_id": 3},
        {"book_id": 2, "list_id": 3},
        {"book_id": 3, "list_id": 3},
        {"book_id": 4, "list_id": 3},
        {"book_id": 5, "list_id": 3},
        {"book_id": 8, "list_id": 4},
        {"book_id": 9, "list_id": 5},
        {"book_id": 13, "list_id": 5},
        {"book_id": 14, "list_id": 5},
        {"book_id": 10, "list_id": 6},
        {"book_id": 11, "list_id": 6},
        {"book_id": 12, "list_id": 6}
    ]

    for list in data:
        connection.execute(list_books.insert(), list)
    connection.close()

def unseed_list_books():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.list_books RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM list_books"))

    db.session.commit()