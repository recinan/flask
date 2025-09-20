from marshmallow import Schema, fields, validate, post_load, ValidationError, validates
from models.user_model import User


class UserRegisterSchema(Schema):
    email = fields.Email(required=True, validate=validate.Length(max=80))
    password = fields.Str(load_only=True, required=True, validate=validate.Length(min=6,max=120))

    @validates("email")
    def validate_email(self, email, **kwargs):
        if not email.endswith(".com"):
            raise ValidationError("Only emails with .com extension are allowed")

    @post_load
    def make_user(self, data, **kwargs):
        user = User(email=data["email"])
        user.set_password(data["password"])
        return user

user_register_schema = UserRegisterSchema()

class UserLoginSchema(Schema):
    email = fields.Email(required=True, validate=validate.Length(max=80))
    password = fields.Str(load_only=True, required=True, validate=validate.Length(min=6,max=120))

user_login_schema = UserLoginSchema()
