from app.models import db, User, environment, SCHEMA
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
    

    db.session.add(demo)
    db.session.add(jane)
    db.session.add(rick)
    db.session.add(delia)
    db.session.add(naomi)
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
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()