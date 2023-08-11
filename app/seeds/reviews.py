from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    review1= Review(user_id=2, book_id=1, review_body="Chapter One: I Accidentally Vaporize the Person who Tried to Take this Book Away from Me", review_stars=5)
    review2= Review(user_id=2, book_id=2, review_body="These books keep getting better and better, it's a shame the movies were so different", review_stars=4)
    review3= Review(user_id=2, book_id=3, review_body="not gonna lie, it took me a little bit of time to fully get into this one, but the pay off was worth it. so many crazy things happened in this book & i'm still sitting here in a bit of shock!", review_stars=3)
    review4= Review(user_id=2, book_id=4, review_body="this is my favorite in the series so far! let's see if the last olympian will top it.", review_stars=5)
    review5= Review(user_id=2, book_id=5, review_body="Wow that was a great ending to this very fantastical series! I cannot wait to go into more detail in my series review which will be out probably next week. I'll be covering my opinions on all 5 books and then my overall opinion of the series. I am so happy I FINALLY read PJO! This was a 'dam' good series", review_stars=5)
    review6= Review(user_id=3, book_id=6, review_body="'Pride and Prejudice' by Jane Austen started off annoying me and ended up enchanting me. Up until about page one hundred I found this book vexing, frivolous and down right tedious. I now count myself as a convert to the Austen cult.", review_stars=4)
    review7= Review(user_id=3, book_id=7, review_body="before she began writing this novel, JA said, ‘i am going to take a heroine whom no one but myself will much like.’ and sis, if that aint the truth.", review_stars=3)
    review8= Review(user_id=1, book_id=7, review_body="Emma woodhouse changes from being vain and self satisfied, blind to her own feelings and dangerously insensitive to the feelings of others, in a slow, painful progress towards maturity.", review_stars=4)

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.add(review7)
    db.session.add(review8)
    db.session.commit()
    

def unseed_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()