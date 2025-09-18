
const API_URL = "http://127.0.0.1:5000"

export async function getContacts() {
    try{
        const response = await fetch(`${API_URL}/contacts`)
        const data = await response.json()
        return data;
    }catch(err){
        console.log(err)
    }
    finally{}
}

export async function createContact(contact) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(contact),
    }
    const response = await fetch(`${API_URL}/create_contact`, options)
    return response;
}

export async function updateContact(id, contact) {
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(contact),
    }
    const response = await fetch(`${API_URL}/update_contact/${id}`, options)
    return response;
}

export async function deleteContact(id) {
    const options = {
        method: "DELETE"
    }
    const response = await fetch(`${API_URL}/delete_contact/${id}`, options)
    return response;
}
