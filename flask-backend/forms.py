from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField
from wtforms.validators import DataRequired, Email, Length, EqualTo


class UserAddForm(FlaskForm):

    username = StringField('Username', validators=[
                           DataRequired(message="This field is required")])
    first_name = StringField('First Name', validators=[
                             DataRequired(message="This field is required")])
    last_name = StringField('Last Name', validators=[
                            DataRequired(message="This field is required")])
    email = StringField(
        'E-mail', validators=[DataRequired(message="This field is required"), Email()])
    password = PasswordField('Password', validators=[DataRequired(
        message="This field is required"), Length(min=8)])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired(
        message="This field is required"), EqualTo('password', message=('Passwords must match'))])
    submit = SubmitField('Sign Up')

class UserEditForm(FlaskForm):

    username = StringField('Username', validators=[DataRequired()])
    first_name = StringField('First Name', validators=[DataRequired()])
    last_name = StringField('Last Name', validators=[DataRequired()])
    email = StringField('E-mail', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[Length(min=8)])


class LoginForm(FlaskForm):

    username = StringField('Username', validators=[
                           DataRequired(message="Username cannot be blank")])
    password = PasswordField('Password', validators=[DataRequired(
        message="Password cannot be blank"), Length(min=8)])
    remember = BooleanField('Remember Me')
    submit = SubmitField('Login')
