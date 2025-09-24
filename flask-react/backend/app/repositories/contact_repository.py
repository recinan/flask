from models.contact_model import Contact
from app import db

def get_all_contacts():
    return Contact.query.all()

def get_contact_by_id(contact_id):
    return Contact.query.get(contact_id)

def create_contact(first_name, last_name, email):
    contact = Contact(first_name=first_name, last_name=last_name, email=email)
    print("Service Layer:", first_name, last_name, email)
    db.session.add(contact)
    db.session.commit()
    return contact

def update_contact(contact):
    db.session.commit()
    return contact

def delete_contact(contact):
    db.session.delete(contact)
    db.session.commit()