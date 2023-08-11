from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    book_id = IntegerField('book_id', validators=[DataRequired()])
    review_body = StringField('review_body', validators=[DataRequired()])
    review_stars = IntegerField('review_stars', validators=[DataRequired()])