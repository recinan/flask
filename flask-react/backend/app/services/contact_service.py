from repositories.contact_repository import (
    get_all_contacts,
    get_contact_by_id,
    create_contact,
    update_contact,
    delete_contact,
)

def list_contacts():
    return get_all_contacts()

def create_new_contact(first_name, last_name, email):
    if not first_name or not last_name or not email:
        raise ValueError("First name, last name and email are required")
    return create_contact(first_name=first_name,last_name=last_name,email=email)
    
def update_existing_contact(contact_id, data):
    contact = get_contact_by_id(contact_id)
    if not contact:
        raise ValueError("Contact not found")
    
    contact.first_name = data.get("firstName", contact.first_name)
    contact.last_name = data.get("lastName", contact.last_name)
    contact.email = data.get("email",contact.email)

    return update_contact(contact)

def delete_existing_contact(contact_id):
    contact = get_contact_by_id(contact_id)
    if not contact:
        raise ValueError("Contact not found")
    return delete_contact(contact)