from app.models import db, User, Bookshelf, environment, SCHEMA
from sqlalchemy.sql import text
import random

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

        # List of real first names and last names
    real_first_names = [
        "Emma", "Liam", "Olivia", "Noah", "Ava", "Isabella", "Sophia", "Jackson", "Mia", "Lucas",
        "Harper", "Evelyn", "Oliver", "Aria", "Charlotte", "Benjamin", "Amelia", "Elijah", "Abigail", "Henry",
        "Sofia", "Alexander", "Madison", "Sebastian", "Scarlett", "Matthew", "Victoria", "Joseph", "Grace",
        "Levi", "Riley", "David", "Chloe", "Samuel", "Zoey", "John", "Nora", "Liam", "Avery", "James",
        "Ella", "Lincoln", "Samantha", "Daniel", "Hazel", "Joseph", "Penelope", "Michael", "Luna"
    ]
    real_last_names = [
        "Smith", "Johnson", "Brown", "Taylor", "Miller", "Wilson", "Moore", "Davis", "Garcia", "Martinez",
        "Jones", "Clark", "Hernandez", "Lopez", "Young", "Lee", "Walker", "Perez", "Hall", "Lewis"
    ]

    user_data = []

    for _ in range(50):
        first_name = random.choice(real_first_names)
        last_name = random.choice(real_last_names)
        username = last_name.lower() + first_name.lower() + str(random.randint(100, 999))
        email = f"{first_name.lower()}.{last_name.lower()}{str(random.randint(100, 999))}@email.io"
        password = "password"
        
        user = User(
            first_name=first_name,
            last_name=last_name,
            username=username,
            email=email,
            password=password
        )
        db.session.add(user)
        db.session.commit()
        bookshelves = [Bookshelf(user_id=user.id, shelf_type="Want to Read"), Bookshelf(user_id=user.id, shelf_type="Reading"), Bookshelf(user_id=user.id, shelf_type="Read")]
        db.session.bulk_save_objects(bookshelves)
        user_data.append(user)


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