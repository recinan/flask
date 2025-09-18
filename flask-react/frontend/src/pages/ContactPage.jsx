import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";

function ContactPage(){
    return(
        <div>
            <h2>Contact List</h2>
            <ContactForm />
            <ContactList />
        </div>
    )
}

export default ContactPage;