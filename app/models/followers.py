from .db import db, environment, SCHEMA,add_prefix_for_prod

followers = db.Table(
    'followers',
    db.Model.metadata,
    db.Column('id', db.Integer, primary_key=True, autoincrement=True),
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'))),
    db.Column('following_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))

)

if environment == 'production':
    followers.schema = SCHEMA