from repositories.user_repository import get_user_by_email, create_user
from flask_jwt_extended import create_access_token
from models.user_model import User

def register_user(user):
    if get_user_by_email(email=user.email):
        raise ValueError("This email has alredy registered!")
    return create_user(user)

def login_user(email,password):
    user = get_user_by_email(email)
    if not user or not user.check_password(password):
        raise ValueError("Invalid mail or password")
    access_token = create_access_token(identity=user.id)
    return access_token