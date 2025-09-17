from flask import Blueprint, request, jsonify
from services.contact_service import (
    list_contacts,
    create_new_contact,
    update_existing_contact,
    delete_existing_contact
)

contact_blueprint = Blueprint("contacts", __name__)

@contact_blueprint.route("/contacts", methods=["GET"])
def get_contacts_route():
    contacts = list_contacts()
    return jsonify({"contacts": [c.to_dict() for c in contacts]})

@contact_blueprint.route("/create_contact", methods=["POST"])
def create_contact_route():
    data = request.json 
    print(data)
    try:
        create_new_contact(first_name=data.get("firstName"), last_name=data.get("lastName"), email=data.get("email"))
        return jsonify({"message":"User created!"}), 201
    except ValueError as e:
        return jsonify({"message":str(e)}), 400
    
@contact_blueprint.route("/update_contact/<int:contact_id>", methods=["PATCH"])   
def update_contact_route(contact_id):
    data = request.json
    try:
        update_existing_contact(contact_id, data)
        return jsonify({"message":"User update."}), 200
    except ValueError as e:
        return jsonify({"message":str(e)}), 404
    

@contact_blueprint.route("/delete_contact/<int:contact_id>", methods=["DELETE"])
def delete_contact_route(contact_id):
    try:
        delete_existing_contact(contact_id)
        return jsonify({"message":"User deleted!"}), 200
    except ValueError as e:
        return jsonify({"message":str(e)}), 404