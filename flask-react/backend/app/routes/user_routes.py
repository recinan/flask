from flask import Blueprint, request, jsonify
from services.user_service import register_user, login_user
from schemas.user_schema import user_register_schema, user_login_schema
from marshmallow import ValidationError

user_blueprint = Blueprint("users", __name__, url_prefix="/auth")


@user_blueprint.route("/register",methods=["POST"])
def register_route():
    #data = request.json
    try:
        user = user_register_schema.load(request.json)
        created_user = register_user(user)
        return jsonify({"message":"User registered successfully!","user":user_register_schema.dump(created_user)}), 201
    except ValidationError as err:
        print(err.messages)
        messages = "; ".join([f"{field}: {', '.join(msgs)}" for field, msgs in err.messages.items()])
        return jsonify({"message": messages}), 400
    except ValueError as e:
        print(str(e))
        return jsonify({"message":str(e)}), 400
    
@user_blueprint.route("/login", methods=["POST"])
def login_route():
    data = request.json
    try:
        user = user_login_schema.load(data)
        token = login_user(user["email"], user["password"])
        return jsonify({"access_token":token}), 200
    except ValueError as e:
        return jsonify({"message": str(e)}), 401
