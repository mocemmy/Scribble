"""empty message

Revision ID: bab6586b0d87
Revises: 
Create Date: 2023-08-08 10:13:36.808744

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'bab6586b0d87'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('first_name', sa.String(length=50), nullable=False),
    sa.Column('last_name', sa.String(length=50), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('bio', sa.String(length=255), nullable=True),
    sa.Column('profile_pic', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('books',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('creator_id', sa.Integer(), nullable=True),
    sa.Column('author_first_name', sa.String(length=50), nullable=False),
    sa.Column('author_last_name', sa.String(length=50), nullable=False),
    sa.Column('title', sa.String(length=50), nullable=False),
    sa.Column('genre', sa.String(length=50), nullable=True),
    sa.Column('summary', sa.String(length=5000), nullable=True),
    sa.Column('book_cover', sa.String(length=1000), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['creator_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('followers',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('follower_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['follower_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('lists',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('creator_id', sa.Integer(), nullable=True),
    sa.Column('list_name', sa.String(length=50), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['creator_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('bookshelves',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('book_id', sa.Integer(), nullable=True),
    sa.Column('shelf_type', sa.String(length=50), nullable=False),
    sa.ForeignKeyConstraint(['book_id'], ['books.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('list_books',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('book_id', sa.Integer(), nullable=True),
    sa.Column('list_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['book_id'], ['books.id'], ),
    sa.ForeignKeyConstraint(['list_id'], ['lists.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('book_id', sa.Integer(), nullable=True),
    sa.Column('review_body', sa.String(length=255), nullable=False),
    sa.Column('review_stars', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['book_id'], ['books.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")

def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reviews')
    op.drop_table('list_books')
    op.drop_table('bookshelves')
    op.drop_table('lists')
    op.drop_table('followers')
    op.drop_table('books')
    op.drop_table('users')
    # ### end Alembic commands ###