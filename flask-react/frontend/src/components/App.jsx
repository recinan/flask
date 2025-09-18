import { useState } from "react";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import "../css/App.css"
import { ContactsProvider, useContacts } from "../contexts/ContactsContext";

function App(){
    const { isModalOpen, openCreateModal, openEditModal, closeModal, currentContact} = useContacts();
    return (
        <>
            <ContactList updateContact={openEditModal}/>
            <button onClick={openCreateModal}>Create New Contact</button>
            {isModalOpen &&
            <div className="modal"> 
                <div className="modal-content">
                    <span className="close" onClick={closeModal}>
                        &times;
                    </span>
                    <ContactForm existingContact={currentContact} closeModal={closeModal}></ContactForm>
                </div>
            </div>

            }
        </>
    )
}

export default App;