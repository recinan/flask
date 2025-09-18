from models.user_model import User
from config import db

def get_user_by_email(email):
    return User.query.filter_by(email=email).first()

def create_user(email, password):
    user = User(email=email)
    user.set_password(password)
    db.session.add(user)

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        raise e
    return user