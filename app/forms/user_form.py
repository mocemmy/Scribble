from flask_wtf import FlaskForm
from flask_login import current_user
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.aws_helpers import ALLOWED_EXTENSIONS
from app.models import User

def email_taken(form, field):
    email = field.data
    users = User.query.filter(User.email == email).all()
    #check that the email is not in use by another user
    for user in users:
        if current_user.id != user.id:
            raise ValidationError("Email address is already in use.")

class UserForm(FlaskForm):
    email=StringField("email", validators=[email_taken, Length(max=255)])
    password=StringField("password", validators=[Length(max=255)])
    bio=StringField("bio", validators=[Length(max=255)])
    profile_pic=FileField("profile_pic", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])