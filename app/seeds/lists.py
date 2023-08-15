from app.models import db, List, environment, SCHEMA
from sqlalchemy.sql import text

def seed_lists():
    list1 = List(creator_id=1, list_name='YA fiction', description='YA nostalgia')
    list2 = List(creator_id=2, list_name='Classics', description='Classic Literature')
    list3 = List(creator_id=3, list_name='Percy Jackson and the Olympians', description='The Percy Jackson and the Olympians series by Rick Riordan')
    list4 = List(creator_id=4, list_name='Mysteries', description='Contemporary Mysteries')
    list5 = List(creator_id=5, list_name='The Scholomance', description='The scholomance series by Naomi Novik')
    list6 = List(creator_id=6, list_name='The Hunger Games', description='The hunger games series by Suzanne Collins')
    db.session.add(list1)
    db.session.add(list2)
    db.session.add(list3)
    db.session.add(list4)
    db.session.add(list5)
    db.session.add(list6)
    db.session.commit()

def unseed_lists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM lists"))

    db.session.commit()
