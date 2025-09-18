import { useState } from "react";
import { useContacts } from "../contexts/ContactsContext";

function ContactForm({existingContact = {}}){
    const [firstName, setFirstName] = useState(existingContact.firstName || "")
    const [lastName, setLastName] = useState(existingContact.lastName || "")
    const [email, setEmail] = useState(existingContact.email || "")
    const { saveContact, closeModal } = useContacts()

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = {firstName, lastName, email};
        const success = await saveContact(data, existingContact)
    }

    const updating = Object.entries(existingContact).length !== 0;

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="firstName">First Name: </label>
                <input 
                type="text" 
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="lastName">Last Name: </label>
                <input 
                type="text" 
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="email">First Name: </label>
                <input 
                type="text" 
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button type="submit">{updating ? "Update":"Create Contact"}</button>
        </form>
    )

}

export default ContactForm;