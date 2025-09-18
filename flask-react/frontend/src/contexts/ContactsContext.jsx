import React, { useEffect } from "react";
import { createContext, useContext, useState} from "react";
import { getContacts, createContact, updateContact, deleteContact } from "../services/contactService";

const ContactsContext = createContext();

export const ContactsProvider = ({children}) => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentContact, setCurrentContact] = useState({})

    const fetchContacts = async () => {
        const data = await getContacts()
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
        try{
            let response;
            if(Object.keys(existingContact).length !== 0){
                response = await updateContact(existingContact.id, contact);
            }else{
                response = await createContact(contact)
            }
            if(response.status !== 201 && response.status !== 200){
                const err = await response.json()
                alert (err.message)
                return false;
            }else{
                onUpdate();
                return true;
            }
        }
        catch(err){console.log(err)}
        finally{}    
    }
        

    const onDelete = async(id) => {
        try{
            const response = await deleteContact(id);
            
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

