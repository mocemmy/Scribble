from flask.cli import AppGroup
from .users import seed_users, undo_users
from .books import seed_books, unseed_books
from .reviews import seed_reviews, unseed_reviews
from .lists import seed_lists, unseed_lists
from .list_books import seed_list_books, unseed_list_books

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        unseed_list_books()
        unseed_lists()
        unseed_reviews()
        unseed_books()
        undo_users()
    seed_users()
    seed_books()
    seed_reviews()
    seed_lists()
    seed_list_books()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    unseed_list_books()
    unseed_lists()
    unseed_reviews()
    unseed_books()
    undo_users()
    # Add other undo functions here