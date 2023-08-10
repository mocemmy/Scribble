from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.aws_helpers import ALLOWED_EXTENSIONS

class BookForm(FlaskForm):
    creator_id=IntegerField("creator_id", validators=[DataRequired()])
    author_first_name = StringField("author_first_name", validators=[DataRequired()])
    author_last_name = StringField("author_last_name", validators=[DataRequired()])
    title = StringField("title", validators=[DataRequired()])
    genre = StringField("genre")
    summary = StringField("summary")
    book_cover = FileField('book_cover', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])