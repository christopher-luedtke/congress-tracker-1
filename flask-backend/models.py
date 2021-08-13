from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db = SQLAlchemy()
bcrypt = Bcrypt()


class User(db.Model, UserMixin):

    __tablename__ = 'users'

    id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True
    )

    username = db.Column(
        db.String,
        nullable=False,
        unique=True,
    )

    first_name = db.Column(
        db.String,
        nullable=False,
    )

    last_name = db.Column(
        db.String,
        nullable=False,
    )

    email = db.Column(
        db.String,
        nullable=False,
        unique=True,
    )

    password = db.Column(
        db.String,
        nullable=False,
    )

    def __repr__(self):
        return f"<User #{self.id}: {self.username}, {self.email}>"

    def signup(cls, username, first_name, last_name, email, password):

        hashed_pwd = bcrypt.generate_password_hash(password).decode('UTF-8')

        user = User(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=hashed_pwd,
        )

        db.session.add(user)
        return user

    @classmethod
    def authenticate(cls, username, password):

        user = cls.query.filter_by(username=username).first()

        if user:
            is_auth = bcrypt.check_password_hash(user.password, password)
            if is_auth:
                return user

        return False


class Congress(db.Model):
    __tablename__ = "congress"
    id = db.Column(db.String, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    party = db.Column(db.String, nullable=False)
    us_state = db.Column(db.String, nullable=False)
    total_votes = db.Column(db.Integer)
    voted_present = db.Column(db.Integer)
    voted_with = db.Column(db.Integer)
    voted_against = db.Column(db.Integer)
    missed_votes = db.Column(db.Integer)

    def serialize(self):
        return {
            'id': self._id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'party': self.party,
            'us_state': self.state,
            'total_votes': self.total_votes,
            'voted_present': self.voted_present,
            'voted_with': self.voted_with,
            'voted_against': self.voted_against,
            'missed_votes': self.missed_votes
        }

    def __repr__(self):
        return f"<Congress {self.id} >"


def connect_db(app):
    db.app = app
    db.init_app(app)
