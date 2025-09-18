from flask import Blueprint, request, jsonify
from services.user_service import register_user, login_user

user_blueprint = Blueprint("users", __name__, url_prefix="/auth")


@user_blueprint.route("/register",methods=["POST"])
def register_route():
    data = request.json
    try:
        register_user(data.get("email"),data.get("password"))
        return jsonify({"message":"User has been already created! "})
    except ValueError as e:
        return jsonify({"message":str(e)}), 400
    
@user_blueprint.route("/login", methods=["POST"])
def login_route():
    data = request.json
    try:
        token = login_user(data.get("email"), data.get("password"))
        return jsonify({"access_token":token}), 200
    except ValueError as e:
        return jsonify({"message": str(e)}), 401
