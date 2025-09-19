import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";
import { useContacts } from "../contexts/ContactsContext";

function ContactPage(){

    const { isModalOpen, openCreateModal, openEditModal, closeModal, currentContact} = useContacts();

    return(
        <div>
            <h2>Contact List</h2>
            <ContactForm />
            <ContactList updateContact={openEditModal}/>
            {isModalOpen &&
            <div className="modal"> 
                <div className="modal-content">
                    <span className="close" onClick={closeModal}>
                        &times;
                    </span>
                    <h3>Update</h3>
                    <ContactForm existingContact={currentContact} closeModal={closeModal}></ContactForm>
                </div>
            </div>
            }
        </div>
    )
}

export default ContactPage;