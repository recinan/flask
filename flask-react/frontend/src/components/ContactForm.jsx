import { useState } from "react";
import { useContacts } from "../contexts/ContactsContext";
import "../css/ContactForm.css"

function ContactForm({existingContact = {}}){
    const [firstName, setFirstName] = useState(existingContact.firstName || "")
    const [lastName, setLastName] = useState(existingContact.lastName || "")
    const [email, setEmail] = useState(existingContact.email || "")
    const { saveContact, closeModal } = useContacts()

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = {firstName, lastName, email};
        const success = await saveContact(data, existingContact)
        if(success && closeModal) closeModal();
    }

    const updating = Object.entries(existingContact).length !== 0;

    return (
        <form className="contact-form" onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="firstName">First Name: </label>
                <input 
                type="text" 
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="lastName">Last Name: </label>
                <input 
                type="text" 
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email: </label>
                <input 
                type="text" 
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button type="submit" className="form-button">{updating ? "Update":"Create Contact"}</button>
        </form>
    )

}

export default ContactForm;