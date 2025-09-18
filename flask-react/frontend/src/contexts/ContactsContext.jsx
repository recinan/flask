import React, { useEffect } from "react";
import { createContext, useContext, useState} from "react";

const ContactsContext = createContext();

export const ContactsProvider = ({children}) => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentContact, setCurrentContact] = useState({})

    const fetchContacts = async () => {
        const response = await fetch("http://127.0.0.1:5000/contacts")
        const data = await response.json()
        setContacts(data.contacts)
        setLoading(false);
    };

    useEffect(() => {
        fetchContacts();
    },[]);

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentContact({});
    }

    const openCreateModal = () => {
        if(!isModalOpen){
            setIsModalOpen(true);
        }
    }

    const openEditModal = (contact) => {
        if(isModalOpen) return
        setCurrentContact(contact);
        setIsModalOpen(true);
    }

    const onUpdate = () => {
        closeModal();
        fetchContacts();
    }

    const saveContact = async (contact, existingContact) => {
        const updating = Object.entries(existingContact).length !== 0;
        const url = "http://127.0.0.1:5000/" + (updating ? `update_contact/${existingContact.id}` : "create_contact")

        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(contact),
        }

        const response = await fetch(url, options);
        if(response.status !== 201 && response.status !== 200){
            const err = await response.json()
            alert (err.message)
            return false;
        }else{
            onUpdate();
            return true;
        }
    }

    const onDelete = async(id) => {
        try{
            const options = {
            method: "DELETE"
        }
        const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, options);
        
        if(response.status === 200){
            onUpdate()
        }else{
            console.log("Failed to delete")
        }
        }catch(err){
            alert(err)
            console.log(err)
        }finally{}
    }

    return (
        <ContactsContext.Provider value={{
            contacts, 
            loading, 
            saveContact, 
            onDelete,
            fetchContacts,
            isModalOpen,
            openCreateModal,
            openEditModal,
            onUpdate,
            closeModal,
            currentContact
            }}>
            {children}
        </ContactsContext.Provider>
    )
}

export function useContacts(){
    return useContext(ContactsContext)
}

