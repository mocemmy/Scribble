from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class ListForm(FlaskForm):
    creator_id = IntegerField('creator_id', validators=[DataRequired()])
    list_name = StringField('list_name', validators=[DataRequired()])
    description = StringField('description')