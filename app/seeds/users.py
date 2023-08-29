from app.models import db, User, Bookshelf, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name="Emily", last_name="Morgan", username='emily', email='demo@aa.io', password='password') #1
    jane = User(
        first_name="Jane", last_name="Austen", username='janie', email='jane@aa.io', password='password') #2
    rick = User(
        first_name="Rick", last_name="Riordan", username='unclerick', email='rick@aa.io', password='password') #3
    delia = User(
        first_name="Delia", last_name="Owens", username='delia', email='delia@aa.io', password='password') #4
    naomi = User(
        first_name="Naomi", last_name="Novik", username='naomi', email='naomi@aa.io', password='password') #5
    suzanne = User(
        first_name="Suzanne", last_name="Collins", username='suzanne', email='suzanne@aa.io', password='password') #6
    

    db.session.add(demo)
    db.session.add(jane)
    db.session.add(rick)
    db.session.add(delia)
    db.session.add(naomi)
    db.session.add(suzanne)
    db.session.commit()
    #add default bookshelves for seed users
    bookshelves = [
        Bookshelf(user_id=demo.id, shelf_type="Want to Read"),
        Bookshelf(user_id=jane.id, shelf_type="Want to Read"),
        Bookshelf(user_id=rick.id, shelf_type="Want to Read"),
        Bookshelf(user_id=delia.id, shelf_type="Want to Read"),
        Bookshelf(user_id=naomi.id, shelf_type="Want to Read"),
        Bookshelf(user_id=suzanne.id, shelf_type="Want to Read"),
        Bookshelf(user_id=demo.id, shelf_type="Reading"),
        Bookshelf(user_id=jane.id, shelf_type="Reading"),
        Bookshelf(user_id=rick.id, shelf_type="Reading"),
        Bookshelf(user_id=delia.id, shelf_type="Reading"),
        Bookshelf(user_id=naomi.id, shelf_type="Reading"),
        Bookshelf(user_id=suzanne.id, shelf_type="Reading"),
        Bookshelf(user_id=demo.id, shelf_type="Read"),
        Bookshelf(user_id=jane.id, shelf_type="Read"),
        Bookshelf(user_id=rick.id, shelf_type="Read"),
        Bookshelf(user_id=delia.id, shelf_type="Read"),
        Bookshelf(user_id=naomi.id, shelf_type="Read"),
        Bookshelf(user_id=suzanne.id, shelf_type="Read"),
    ]
    for shelf in bookshelves:
        db.session.add(shelf)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.bookshelves RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        db.session.execute(text("DELETE FROM bookshelves"))
        
    db.session.commit()