
import { useContacts } from "../contexts/ContactsContext";
import "../css/ContactList.css"

function ContactList({updateContact}){
    const { contacts, onDelete} = useContacts();
    return (
        <div className="contacts-container">
            <h2>Contacts</h2>
            <table className="contacts-table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map(contact => (
                        <tr key={contact.id}>
                            <td>{contact.firstName}</td>
                            <td>{contact.lastName}</td>
                            <td>{contact.email}</td>
                            <td>
                                <button className="btn-update" onClick={() => updateContact(contact)}>Update</button>
                                <button className="btn-delete" onClick={() => onDelete(contact.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}

export default ContactList;